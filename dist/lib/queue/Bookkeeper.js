import { Node } from './Node';
/**
 * This class keeps track of the start, end and size of the queue
 * stored in local storage. It allows nodes to be created and removed.
 */
export class Bookkeeper {
    /**
       * Creates a new Bookkeeper for a queue. It should be initialized using reset method.
       */
    constructor(_config) {
        this._config = _config;
    }
    /**
       * Stores the current state of the queue to local storage.
       */
    store() {
        try {
            const serializedInfo = JSON.stringify(this._info);
            // Ideally this would all be inside a transaction {
            this._removed.forEach(node => node.remove());
            this._added.forEach((node) => {
                if (!node.store()) {
                    this._info.sizeInBytes = this._config.maxSizeInBytes; // Maximum limit reached
                    console.warn('ngAlogy: local storage filled up...');
                    let tries = 500; // Set to max tries before giving up
                    while (tries > 0) {
                        if (node.store()) {
                            tries = -1;
                        }
                        tries--;
                    }
                    if (tries >= 0) {
                        console.warn('Error: No more space, and the efforts done to fix it failed :/');
                        throw new Error('No more space');
                    }
                }
            });
            localStorage.setItem(this._config.keyPrefix, serializedInfo);
        }
        finally {
            this._added = [];
            this._removed = [];
        }
    }
    /**
       * Resets the start, end and size counts to what was last persisted to
       * local storage.
       */
    reset() {
        this._added = [];
        this._removed = [];
        const serializedInfo = localStorage.getItem(this._config.keyPrefix);
        if (serializedInfo === null) {
            this._info = {
                sizeInBytes: 0,
                startIndex: 0,
                nextFreeIndex: 0
            };
            this.store();
        }
        else {
            this._info = JSON.parse(serializedInfo);
        }
    }
    /**
       * Returns true if the queue has no elements.
       */
    isEmpty() {
        return this._info.sizeInBytes === 0;
    }
    /**
       * Calculates the projected free space. This takes into account modifications.
       */
    remainingSpace() {
        return this._config.maxSizeInBytes - this._info.sizeInBytes;
    }
    /**
       * Creates a new node at the end of the queue.
       * @param value The value to store as an element of the queue.
       */
    createNextNode(value) {
        const node = new Node(this._config, this._info.nextFreeIndex, value);
        this._info.nextFreeIndex = this._nextIndex(this._info.nextFreeIndex);
        this._info.sizeInBytes += node.estimatedSize();
        this._added.push(node);
        return node;
    }
    /**
       * Removes and returns the first stored node. The consumer should check that there is a node to remove first.
       */
    deleteFirstNode() {
        const node = Node.fromLocalStorage(this._config, this._info.startIndex);
        this._info.startIndex = this._nextIndex(this._info.startIndex);
        this._info.sizeInBytes -= node.estimatedSize();
        this._removed.push(node);
        return node;
    }
    /**
       * Iterates through the index values of the elements in the queue. These can be used to retrieve the elements.
       * @param callback The function that will be invoked once for each index value used in the queue.
       */
    iterateIndexValues(callback) {
        for (let i = this._info.startIndex; i !== this._info.nextFreeIndex; i = this._nextIndex(i)) {
            callback(i);
        }
    }
    /**
       * Returns the next index value (modulo MAX_SAFE_INTEGER).
       * @param index The previous index value.
       */
    _nextIndex(index) {
        const MAX_SAFE_INTEGER = 9007199254740991;
        return (index + 1) % MAX_SAFE_INTEGER;
    }
}
//# sourceMappingURL=Bookkeeper.js.map