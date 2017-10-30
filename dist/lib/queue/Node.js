/**
 * Each node corresponds to an entry within the queue. This helps with
 * storage and removal from local storage.
 */
var Node = /** @class */ (function () {
    /**
     * Constructs a node representing an entry in the queue.
     * @param config The queue configuration. This is used to provide the prefix for the key.
     * @param index The index within the queue
     * @param value The value of the entry
     */
    function Node(config, index, value) {
        this.value = value;
        this._key = Node.createKey(config, index);
        this._serializedNode = JSON.stringify(value);
    }
    /**
     * Returns an estimate of the size this will take up in local storage.
     */
    Node.prototype.estimatedSize = function () {
        return this._serializedNode.length + this._key.length;
    };
    /**
     * Stores the serialized entry in local storage.
     * @return {boolean} Success?
     */
    Node.prototype.store = function () {
        try {
            localStorage.setItem(this._key, this._serializedNode);
            return true;
        }
        catch (ex) {
            return false;
        }
    };
    /**
     * Removes the entry from local storage if it exists.
     */
    Node.prototype.remove = function () {
        localStorage.removeItem(this._key);
    };
    /**
     * Creates a key for an entry.
     * @param config The configuration containing the key prefix
     * @param index The index of the entry in the queue
     */
    Node.createKey = function (config, index) {
        return config.keyPrefix + "-item-" + index;
    };
    /**
     * Loads an entry from local storage and deserializes it. Returns the associated node.
     * @param config The configuration containing the key prefix
     * @param index The index of the entry in the queue
     */
    Node.fromLocalStorage = function (config, index) {
        var serializedNode = localStorage.getItem(Node.createKey(config, index));
        var value = JSON.parse(serializedNode || '{}');
        return new Node(config, index, value);
    };
    return Node;
}());
export { Node };
//# sourceMappingURL=Node.js.map