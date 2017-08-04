import { Node } from './Node';
import { Bookkeeper } from './Bookkeeper';
/**
 * A limited-size queue that is persisted to local storage. Enqueuing
 * elements can remove the oldest elements in order to free up space.
 */
var LimitedSizeQueue = (function () {
    /**
     * Creates/restores a queue based on the configuration provided.
     * @param _config The settings for the queue
     */
    function LimitedSizeQueue(_config) {
        this._config = _config;
        this._bookkeeper = new Bookkeeper(_config);
        this._bookkeeper.reset();
    }
    /**
     * Enqueues an item in the queue. Throws if the value is too big to fit in local storage
     * based on the maximum sized defined in the queue configuration. May also throw
     * if local storage is out of space or corrupted.
     */
    LimitedSizeQueue.prototype.enqueue = function (value) {
        var node = this._bookkeeper.createNextNode(value);
        var spaceRequirement = node.estimatedSize();
        var canFit = this._config.maxSizeInBytes >= spaceRequirement;
        if (!canFit) {
            var message = 'LSL: Value is too big to store. Reverting to previous state.';
            console.error(message);
            this._bookkeeper.reset();
            throw new Error(message);
        }
        var remainingSpace = this._bookkeeper.remainingSpace();
        if (remainingSpace >= 0) {
            this._bookkeeper.store();
        }
        else {
            while (this._bookkeeper.remainingSpace() < 0) {
                this._bookkeeper.deleteFirstNode();
            }
            this._bookkeeper.store();
        }
    };
    /**
     * If the queue has at least 1 item, it removes and returns the oldest item from the queue.
     * Otherwise, it will return nothing.
     */
    LimitedSizeQueue.prototype.dequeue = function () {
        if (this.isEmpty())
            return;
        var node = this._bookkeeper.deleteFirstNode();
        this._bookkeeper.store();
        return node.value;
    };
    /**
     * Returns true if the queue is empty.
     */
    LimitedSizeQueue.prototype.isEmpty = function () {
        return this._bookkeeper.isEmpty();
    };
    /**
     * Iterates (without removal) through all items stored in the queue.
     */
    LimitedSizeQueue.prototype.iterate = function (callback) {
        var _this = this;
        this._bookkeeper.iterateIndexValues(function (i) {
            var node = Node.fromLocalStorage(_this._config, i);
            callback(node.value);
        });
    };
    return LimitedSizeQueue;
}());
export { LimitedSizeQueue };
//# sourceMappingURL=LimitedSizeQueue.js.map