Object.defineProperty(exports, "__esModule", { value: true });
var vmModule = require("./main-view-model");
function pageLoaded(args) {
    var page = args.object;
    var broker = vmModule.mainViewModel;
    page.bindingContext = broker;
}
exports.pageLoaded = pageLoaded;
