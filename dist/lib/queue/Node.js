/**
 * Each node corresponds to an entry within the queue. This helps with
 * storage and removal from local storage.
 */
export class Node {
    /**
       * Constructs a node representing an entry in the queue.
       * @param config The queue configuration. This is used to provide the prefix for the key.
       * @param index The index within the queue
       * @param value The value of the entry
       */
    constructor(config, index, value) {
        this.value = value;
        this._key = Node.createKey(config, index);
        this._serializedNode = JSON.stringify(value);
    }
    /**
       * Returns an estimate of the size this will take up in local storage.
       */
    estimatedSize() {
        return this._serializedNode.length + this._key.length;
    }
    /**
       * Stores the serialized entry in local storage.
       * @return {boolean} Success?
       */
    store() {
        try {
            localStorage.setItem(this._key, this._serializedNode);
            return true;
        }
        catch (ex) {
            return false;
        }
    }
    /**
       * Removes the entry from local storage if it exists.
       */
    remove() {
        localStorage.removeItem(this._key);
    }
    /**
       * Creates a key for an entry.
       * @param config The configuration containing the key prefix
       * @param index The index of the entry in the queue
       */
    static createKey(config, index) {
        return `${config.keyPrefix}-item-${index}`;
    }
    /**
       * Loads an entry from local storage and deserializes it. Returns the associated node.
       * @param config The configuration containing the key prefix
       * @param index The index of the entry in the queue
       */
    static fromLocalStorage(config, index) {
        let serializedNode = localStorage.getItem(Node.createKey(config, index));
        const value = JSON.parse(serializedNode || '{}');
        return new Node(config, index, value);
    }
}
//# sourceMappingURL=Node.js.map