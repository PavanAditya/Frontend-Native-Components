function VirtualList(config) {
    var width = (config && config.w + "px") || "100%";
    var height = (this.height = (config && config.h + "px") || "100%");
    var itemHeight = (this.itemHeight = config.itemHeight);

    this.items = config.items;
    this.generatorFn = config.generatorFn;
    this.totalRows = config.totalRows || (config.items && config.items.length);

    var totalHeight = itemHeight * this.totalRows;
    this.viewport = VirtualList.createViewport(totalHeight);
    this.container = VirtualList.createContainer(width, height);

    var screenItemsLen = Math.ceil(config.h / itemHeight);
    // ? Caching 3 times the number of items that fit in the viewport
    var cachedItemsLen = screenItemsLen * 3;
    this._renderChunk(this.container, 0, cachedItemsLen);

    var self = this;
    var lastRepaintY;
    var maxBuffer = screenItemsLen * itemHeight;

    function onScroll(e) {
        var scrollTop = e.target.scrollTop;
        var first = parseInt(scrollTop / itemHeight) - screenItemsLen;
        first = first < 0 ? 0 : first;
        if (!lastRepaintY || Math.abs(scrollTop - lastRepaintY) > maxBuffer) {
            self._renderChunk(self.container, first, cachedItemsLen);
            lastRepaintY = scrollTop;
        }

        e.preventDefault && e.preventDefault();
    }

    this.container.addEventListener("scroll", onScroll);
}

// ? Core Logic for clearing existing items and rendering new items.
VirtualList.prototype._renderChunk = function (node, fromPos, howMany) {
    // ? A new fragment is called for each chunk render (renderChunk is triggered on every scroll event)
    var fragment = document.createDocumentFragment();
    fragment.appendChild(this.viewport);

    var finalItem = fromPos + howMany;
    finalItem = finalItem > this.totalRows ? this.totalRows : finalItem;

    // ? Creating new items for caching into the viewport after the scroll event is fired.
    // ? Created number of items are 3 times the number of items that fit in the container viewport.
    for (var i = fromPos; i < finalItem; i++) {
        var item;
        if (this.generatorFn) item = this.generatorFn(i);
        else { // ? Implemented only if no generatorFn is provided
            console.log(this.items)
            if (typeof this.items[i] === "string") {
                var itemText = document.createTextNode(this.items[i]);
                item = document.createElement("div");
                item.style.height = this.height;
                item.appendChild(itemText);
            } else {
                item = this.items[i];
            }
        }

        item.style.position = "absolute";
        item.style.top = i * this.itemHeight + "px";
        fragment.appendChild(item);
    }

    node.innerHTML = "";
    // ? Appending the newly created fragment to the container.
    node.appendChild(fragment); 
};

VirtualList.createContainer = function (w, h) {
    var c = document.createElement("div");
    c.style.width = w;
    c.style.height = h;
    c.style.overflow = "auto";
    c.style.position = "relative";
    c.style.padding = 0;
    c.style.border = "1px solid black";
    return c;
};

VirtualList.createViewport = function (h) {
    var viewport = document.createElement("div");
    viewport.style.opacity = 0;
    viewport.style.position = "absolute";
    viewport.style.top = 0;
    viewport.style.left = 0;
    viewport.style.width = "1px";
    viewport.style.height = h + "px";
    return viewport;
};

var list = new VirtualList({
    w: 300,
    h: 300,
    itemHeight: 31,
    totalRows: 1000000,
    // items: ['abc', 'def', 'ghi'], // ? If any elements are to be passed instead of a generator function (if generatorFn is passed, items list will be ignored)
    generatorFn: function (row) {
        var el = document.createElement("div");
        el.innerHTML = "I am row number " + row;
        el.style.border = "1px solid black";
        el.style.textAlign = "center";
        el.style.width = "100%";
        return el;
    }
});

list.container.style.marginLeft = "auto";
list.container.style.marginRight = "auto";
document.getElementById("placeholder").appendChild(list.container);
