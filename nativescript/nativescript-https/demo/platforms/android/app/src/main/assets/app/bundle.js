require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["bundle"],{

/***/ "../../src/https.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableSSLPinning", function() { return enableSSLPinning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableSSLPinning", function() { return disableSSLPinning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "request", function() { return request; });
/* harmony import */ var tns_core_modules_utils_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/tns-core-modules/utils/types.js");
/* harmony import */ var tns_core_modules_utils_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_utils_types__WEBPACK_IMPORTED_MODULE_0__);

var peer = {
    enabled: false,
    allowInvalidCertificates: false,
    validatesDomainName: true
};
var _timeout = 10;
function enableSSLPinning(options) {
    if (!peer.host && !peer.certificate) {
        var certificate = void 0;
        var inputStream = void 0;
        try {
            var file = new java.io.File(options.certificate);
            inputStream = new java.io.FileInputStream(file);
            var x509Certificate = java.security.cert.CertificateFactory.getInstance('X509').generateCertificate(inputStream);
            peer.x509Certificate = x509Certificate;
            certificate = okhttp3.CertificatePinner.pin(x509Certificate);
            inputStream.close();
        }
        catch (error) {
            try {
                if (inputStream) {
                    inputStream.close();
                }
            }
            catch (e) {
            }
            console.error('nativescript-https > enableSSLPinning error', error);
            return;
        }
        peer.host = options.host;
        peer.commonName = options.commonName || options.host;
        peer.certificate = certificate;
        if (options.allowInvalidCertificates === true) {
            peer.allowInvalidCertificates = true;
        }
        if (options.validatesDomainName === false) {
            peer.validatesDomainName = false;
        }
    }
    peer.enabled = true;
    getClient(true);
    console.log('nativescript-https > Enabled SSL pinning');
}
function disableSSLPinning() {
    peer.enabled = false;
    getClient(true);
    console.log('nativescript-https > Disabled SSL pinning');
}
console.info('nativescript-https > Disabled SSL pinning by default');
var Client;
function getClient(reload, timeout) {
    if (reload === void 0) { reload = false; }
    if (timeout === void 0) { timeout = 10; }
    if (Client && reload === false && _timeout === timeout) {
        return Client;
    }
    _timeout = timeout;
    var client = new okhttp3.OkHttpClient.Builder();
    if (peer.enabled === true) {
        if (peer.host || peer.certificate) {
            var spec = okhttp3.ConnectionSpec.MODERN_TLS;
            client.connectionSpecs(java.util.Collections.singletonList(spec));
            var pinner = new okhttp3.CertificatePinner.Builder();
            pinner.add(peer.host, [peer.certificate]);
            client.certificatePinner(pinner.build());
            if (peer.allowInvalidCertificates === false) {
                try {
                    var x509Certificate = peer.x509Certificate;
                    var keyStore = java.security.KeyStore.getInstance(java.security.KeyStore.getDefaultType());
                    keyStore.load(null, null);
                    keyStore.setCertificateEntry('CA', x509Certificate);
                    var keyManagerFactory = javax.net.ssl.KeyManagerFactory.getInstance('X509');
                    keyManagerFactory.init(keyStore, null);
                    var keyManagers = keyManagerFactory.getKeyManagers();
                    var trustManagerFactory = javax.net.ssl.TrustManagerFactory.getInstance(javax.net.ssl.TrustManagerFactory.getDefaultAlgorithm());
                    trustManagerFactory.init(keyStore);
                    var sslContext = javax.net.ssl.SSLContext.getInstance('TLS');
                    sslContext.init(keyManagers, trustManagerFactory.getTrustManagers(), new java.security.SecureRandom());
                    client.sslSocketFactory(sslContext.getSocketFactory());
                }
                catch (error) {
                    console.error('nativescript-https > client.allowInvalidCertificates error', error);
                }
            }
            if (peer.validatesDomainName === true) {
                try {
                    client.hostnameVerifier(new javax.net.ssl.HostnameVerifier({
                        verify: function (hostname, session) {
                            var pp = session.getPeerPrincipal().getName();
                            var hv = javax.net.ssl.HttpsURLConnection.getDefaultHostnameVerifier();
                            return (hv.verify(peer.host, session) &&
                                peer.host === hostname &&
                                peer.host === session.getPeerHost() &&
                                pp.indexOf(peer.commonName) !== -1);
                        },
                    }));
                }
                catch (error) {
                    console.error('nativescript-https > client.validatesDomainName error', error);
                }
            }
        }
        else {
            console.warn('nativescript-https > Undefined host or certificate. SSL pinning NOT working!!!');
        }
    }
    if (timeout) {
        client
            .connectTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS)
            .writeTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS)
            .readTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS);
    }
    Client = client.build();
    return Client;
}
function request(opts) {
    return new Promise(function (resolve, reject) {
        try {
            var client = getClient(false, opts.timeout);
            var request_1 = new okhttp3.Request.Builder();
            request_1.url(opts.url);
            if (opts.headers) {
                Object.keys(opts.headers).forEach(function (key) { return request_1.addHeader(key, opts.headers[key]); });
            }
            var methods = {
                'GET': 'get',
                'HEAD': 'head',
                'DELETE': 'delete',
                'POST': 'post',
                'PUT': 'put',
                'PATCH': 'patch'
            };
            if ((['GET', 'HEAD'].indexOf(opts.method) !== -1) || (opts.method === 'DELETE' && !Object(tns_core_modules_utils_types__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(opts.body))) {
                request_1[methods[opts.method]]();
            }
            else {
                var type = opts.headers && opts.headers['Content-Type'] ? opts.headers['Content-Type'] : 'application/json';
                var body = opts.body || {};
                try {
                    body = JSON.stringify(body);
                }
                catch (ignore) {
                }
                request_1[methods[opts.method]](okhttp3.RequestBody.create(okhttp3.MediaType.parse(type), body));
            }
            if (opts.allowLargeResponse) {
                android.os.StrictMode.setThreadPolicy(android.os.StrictMode.ThreadPolicy.LAX);
            }
            client.newCall(request_1.build()).enqueue(new okhttp3.Callback({
                onResponse: function (task, response) {
                    var content = response.body().string();
                    try {
                        content = JSON.parse(content);
                    }
                    catch (e) {
                    }
                    var statusCode = response.code();
                    var headers = {};
                    var heads = response.headers();
                    var i, len = heads.size();
                    for (i = 0; i < len; i++) {
                        var key = heads.name(i);
                        headers[key] = heads.value(i);
                    }
                    resolve({ content: content, statusCode: statusCode, headers: headers });
                },
                onFailure: function (task, error) {
                    reject(error);
                },
            }));
        }
        catch (error) {
            reject(error);
        }
    });
}
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("D:/MyData/nativescript/nativescript-https/src/https.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "D:/MyData/nativescript/nativescript-https/src/https.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (?<!\\bApp_Resources\\b.*)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css",
	"./app.ts": "./app.ts",
	"./main-page.ts": "./main-page.ts",
	"./main-page.xml": "./main-page.xml"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (?<!\\bApp_Resources\\b.*)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$";

/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
exports.i(__webpack_require__("../node_modules/css-loader/dist/cjs.js?!../node_modules/nativescript-theme-core/css/core.light.css"), "");

// Module
exports.push([module.i, "\r\n", ""]);

; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./app.css") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "style", path: "./app.css" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var tns_core_modules_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/tns-core-modules/application/application.js");
/* harmony import */ var tns_core_modules_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_application__WEBPACK_IMPORTED_MODULE_0__);

        let applicationCheckPlatform = __webpack_require__("../node_modules/tns-core-modules/application/application.js");
        if (applicationCheckPlatform.android && !global["__snapshot"]) {
            __webpack_require__("../node_modules/tns-core-modules/ui/frame/frame.js");
__webpack_require__("../node_modules/tns-core-modules/ui/frame/activity.js");
        }

        
            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/index.js").hmrUpdate;
            global.__initialHmrUpdate = true;
            global.__hmrSyncBackup = global.__onLiveSync;

            global.__onLiveSync = function () {
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                if (global.__initialHmrUpdate) {
                    return;
                }

                setTimeout(() => {
                    global.__hmrSyncBackup({ type, path });
                });
            };

            hmrUpdate().then(() => {
                global.__initialHmrUpdate = false;
            })
        }
        
            const context = __webpack_require__("./ sync recursive (?<!\\bApp_Resources\\b.*)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
            global.registerWebpackModules(context);
            if (true) {
                module.hot.accept(context.id, () => { 
                    console.log("HMR: Accept module '" + context.id + "' from '" + module.i + "'"); 
                });
            }
            
        __webpack_require__("../node_modules/tns-core-modules/bundle-entry-points.js");
        
tns_core_modules_application__WEBPACK_IMPORTED_MODULE_0__["run"]({ moduleName: "main-page" });
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./app.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./app.ts" });
    });
} 
    
        
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./main-page.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onNavigatingTo", function() { return onNavigatingTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postHttpbin", function() { return postHttpbin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHttpbin", function() { return getHttpbin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHttpbinLargeResponse", function() { return getHttpbinLargeResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMockbin", function() { return getMockbin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableSSLPinning", function() { return enableSSLPinning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableSSLPinningExpired", function() { return enableSSLPinningExpired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableSSLPinning", function() { return disableSSLPinning; });
/* harmony import */ var nativescript_https__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../src/https.ts");
/* harmony import */ var tns_core_modules_data_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/tns-core-modules/data/observable/observable.js");
/* harmony import */ var tns_core_modules_data_observable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_data_observable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tns_core_modules_file_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/tns-core-modules/file-system/file-system.js");
/* harmony import */ var tns_core_modules_file_system__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_file_system__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tns_core_modules_ui_dialogs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/tns-core-modules/ui/dialogs/dialogs.js");
/* harmony import */ var tns_core_modules_ui_dialogs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tns_core_modules_ui_dialogs__WEBPACK_IMPORTED_MODULE_3__);




function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = tns_core_modules_data_observable__WEBPACK_IMPORTED_MODULE_1__["fromObject"]({ enabled: false });
}
function getRequest(url, allowLargeResponse) {
    if (allowLargeResponse === void 0) { allowLargeResponse = false; }
    nativescript_https__WEBPACK_IMPORTED_MODULE_0__["request"]({
        url: url,
        method: 'GET',
        timeout: 1,
        allowLargeResponse: allowLargeResponse
    })
        .then(function (response) { return console.log('Https.request response', response); })
        .catch(function (error) {
        console.error('Https.request error', error);
        tns_core_modules_ui_dialogs__WEBPACK_IMPORTED_MODULE_3__["alert"](error);
    });
}
function postRequest(url, body) {
    nativescript_https__WEBPACK_IMPORTED_MODULE_0__["request"]({
        url: url,
        method: 'POST',
        body: body
    })
        .then(function (response) { return console.log('Https.request response', response); })
        .catch(function (error) {
        console.error('Https.request error', error);
        tns_core_modules_ui_dialogs__WEBPACK_IMPORTED_MODULE_3__["alert"](error);
    });
}
function postHttpbin() {
    postRequest('https://httpbin.org/post', { "foo": "bar", "baz": undefined, "plaz": null });
}
function getHttpbin() {
    getRequest('https://httpbin.org/get');
}
function getHttpbinLargeResponse() {
    getRequest('https://httpbin.org/bytes/100000', true);
}
function getMockbin() {
    getRequest('https://mockbin.com/request');
}
function enableSSLPinning(args) {
    var dir = tns_core_modules_file_system__WEBPACK_IMPORTED_MODULE_2__["knownFolders"].currentApp().getFolder('assets');
    var certificate = dir.getFile('httpbin.org.cer').path;
    nativescript_https__WEBPACK_IMPORTED_MODULE_0__["enableSSLPinning"]({ host: 'httpbin.org', commonName: "httpbin.org", certificate: certificate });
    console.log('enabled');
}
function enableSSLPinningExpired(args) {
    var dir = tns_core_modules_file_system__WEBPACK_IMPORTED_MODULE_2__["knownFolders"].currentApp().getFolder('assets');
    var certificate = dir.getFile('httpbin.org.expired.cer').path;
    nativescript_https__WEBPACK_IMPORTED_MODULE_0__["enableSSLPinning"]({ host: 'httpbin.org', certificate: certificate });
    console.log('enabled');
}
function disableSSLPinning(args) {
    nativescript_https__WEBPACK_IMPORTED_MODULE_0__["disableSSLPinning"]();
    console.log('disabled');
}
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./main-page.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./main-page.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./main-page.xml":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
module.exports = "<Page class=\"page\" navigatingTo=\"onNavigatingTo\">\r\n    <Page.actionBar>\r\n        <ActionBar title=\"HTTPS Playground\" class=\"action-bar\"></ActionBar>\r\n    </Page.actionBar>\r\n\r\n    <StackLayout class=\"p-20\">\r\n        <Label class=\"h1 text-center\" color=\"{{ enabled ? 'green' : 'red' }}\" text=\"{{ enabled ? 'Httpbin SSL Pinning Enabled' : 'SSL Pinning Disabled' }}\"/>\r\n        <Button text=\"GET Mockbin\" tap=\"getMockbin\" class=\"t-20 btn btn-primary btn-active\"/>\r\n        <Button text=\"GET Httpbin\" tap=\"getHttpbin\" class=\"t-20 btn btn-primary btn-active\"/>\r\n        <Button text=\"GET Httpbin (large response)\" tap=\"getHttpbinLargeResponse\" class=\"t-20 btn btn-primary btn-active\"/>\r\n        <Button text=\"POST Httpbin \" tap=\"postHttpbin\" class=\"t-20 btn btn-primary btn-active\"/>\r\n        <Button text=\"Httpbin Pinning ON\" tap=\"enableSSLPinning\" class=\"t-20 btn btn-primary btn-active\"/>\r\n        <Button text=\"Httpbin Pinning ON, expired cert\" tap=\"enableSSLPinningExpired\" class=\"t-20 btn btn-primary btn-active\"/>\r\n        <Button text=\"Httpbin Pinning OFF\" tap=\"disableSSLPinning\" class=\"t-20 btn btn-primary btn-active\"/>\r\n        <Label text=\"Here's a spinner to show the main thread is not blocked by network IO\" textWrap=\"true\" class=\"m-20\"/>\r\n        <ActivityIndicator busy=\"true\"/>\r\n    </StackLayout>\r\n\r\n</Page>\r\n"; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./main-page.xml") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "markup", path: "./main-page.xml" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = {"name":"tns-template-hello-world-ts","main":"app.js","version":"1.6.0","author":{"name":"Telerik","email":"support@telerik.com"},"description":"Nativescript hello-world-ts project template","license":"Apache-2.0","keywords":["telerik","mobile","nativescript","{N}","tns","appbuilder","template"],"repository":{"type":"git","url":"git+ssh://git@github.com/NativeScript/template-hello-world-ts.git"},"bugs":{"url":"https://github.com/NativeScript/template-hello-world-ts/issues"},"homepage":"https://github.com/NativeScript/template-hello-world-ts","android":{"v8Flags":"--expose_gc","requireModules":["nativescript-https"],"markingMode":"none"},"devDependencies":{"nativescript-dev-typescript":"^0.3.0"},"_id":"tns-template-hello-world-ts@1.6.0","_shasum":"a567c2b9a56024818c06596dab9629d155c5b8a8","_resolved":"https://registry.npmjs.org/tns-template-hello-world-ts/-/tns-template-hello-world-ts-1.6.0.tgz","_from":"tns-template-hello-world-ts@latest","scripts":{"build.plugin":"cd ../src && npm run build","ci.tslint":"npm i && tslint --config '../tslint.json' 'app/**/*.ts' --exclude '**/node_modules/**'"},"_npmVersion":"2.14.7","_nodeVersion":"4.2.2","_npmUser":{"name":"enchev","email":"vladimir.enchev@gmail.com"},"dist":{"shasum":"a567c2b9a56024818c06596dab9629d155c5b8a8","tarball":"http://registry.npmjs.org/tns-template-hello-world-ts/-/tns-template-hello-world-ts-1.6.0.tgz"},"maintainers":[{"name":"enchev","email":"vladimir.enchev@gmail.com"},{"name":"erjangavalji","email":"erjan.gavalji@gmail.com"},{"name":"fatme","email":"hfatme@gmail.com"},{"name":"hdeshev","email":"hristo@deshev.com"},{"name":"kerezov","email":"d.kerezov@gmail.com"},{"name":"ligaz","email":"stefan.dobrev@gmail.com"},{"name":"nsndeck","email":"nedyalko.nikolov@telerik.com"},{"name":"rosen-vladimirov","email":"rosen.vladimirov.91@gmail.com"},{"name":"sdobrev","email":"stefan.dobrev@gmail.com"},{"name":"tailsu","email":"tailsu@gmail.com"},{"name":"teobugslayer","email":"teobugslayer@gmail.com"},{"name":"valio.stoychev","email":"valio.stoychev@gmail.com"}],"_npmOperationalInternal":{"host":"packages-5-east.internal.npmjs.com","tmp":"tmp/tns-template-hello-world-ts-1.6.0.tgz_1455717516189_0.6427943941671401"},"directories":{},"readme":"ERROR: No README data found!"};

/***/ })

},[["./app.ts","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovTXlEYXRhL25hdGl2ZXNjcmlwdC9uYXRpdmVzY3JpcHQtaHR0cHMvc3JjL2h0dHBzLnRzIiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9tYWluLXBhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vbWFpbi1wYWdlLnhtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXlEO0FBYXpELElBQUksSUFBSSxHQUFVO0lBQ2hCLE9BQU8sRUFBRSxLQUFLO0lBQ2Qsd0JBQXdCLEVBQUUsS0FBSztJQUMvQixtQkFBbUIsRUFBRSxJQUFJO0NBQzFCLENBQUM7QUFFRixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFFWCxTQUFTLGdCQUFnQixDQUFDLE9BQXFDO0lBRXBFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNuQyxJQUFJLFdBQVcsU0FBUSxDQUFDO1FBQ3hCLElBQUksV0FBVyxTQUF5QixDQUFDO1FBQ3pDLElBQUk7WUFDRixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRCxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFD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QVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RELG1FQUFzQixDQUFDLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsZUFBQyxDQUFDLENBQUM7SUFDdEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRU0sU0FBUyx1QkFBdUIsQ0FBQyxJQUEwQjtJQUNoRSxJQUFJLEdBQUcsR0FBRyx5RUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlELG1FQUFzQixDQUFDLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxXQUFXLGVBQUMsQ0FBQyxDQUFDO0lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVNLFNBQVMsaUJBQWlCLENBQUMsSUFBMEI7SUFDMUQsb0VBQXVCLEVBQUUsQ0FBQztJQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEVELHlTQUF5Uyw2QkFBNkIsWUFBWSxvRUFBb0UsaWhDO0FBQ3RaLElBQUksS0FBVTs7QUFFZDtBQUNBO0FBQ0EsMkJBQTJCLDBDQUEwQztBQUNyRSxLQUFLO0FBQ0wsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0RlZmluZWQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3R5cGVzJztcclxuaW1wb3J0ICogYXMgSHR0cHMgZnJvbSAnLi9odHRwcy5jb21tb24nO1xyXG5cclxuaW50ZXJmYWNlIElwZWVyIHtcclxuICBlbmFibGVkOiBib29sZWFuO1xyXG4gIGFsbG93SW52YWxpZENlcnRpZmljYXRlczogYm9vbGVhbjtcclxuICB2YWxpZGF0ZXNEb21haW5OYW1lOiBib29sZWFuO1xyXG4gIGhvc3Q/OiBzdHJpbmc7XHJcbiAgY29tbW9uTmFtZT86IHN0cmluZztcclxuICBjZXJ0aWZpY2F0ZT86IHN0cmluZztcclxuICB4NTA5Q2VydGlmaWNhdGU/OiBqYXZhLnNlY3VyaXR5LmNlcnQuQ2VydGlmaWNhdGU7XHJcbn1cclxuXHJcbmxldCBwZWVyOiBJcGVlciA9IHtcclxuICBlbmFibGVkOiBmYWxzZSxcclxuICBhbGxvd0ludmFsaWRDZXJ0aWZpY2F0ZXM6IGZhbHNlLFxyXG4gIHZhbGlkYXRlc0RvbWFpbk5hbWU6IHRydWVcclxufTtcclxuXHJcbmxldCBfdGltZW91dCA9IDEwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVNTTFBpbm5pbmcob3B0aW9uczogSHR0cHMuSHR0cHNTU0xQaW5uaW5nT3B0aW9ucykge1xyXG4gIC8vIGNvbnNvbGUubG9nKCdvcHRpb25zJywgb3B0aW9ucylcclxuICBpZiAoIXBlZXIuaG9zdCAmJiAhcGVlci5jZXJ0aWZpY2F0ZSkge1xyXG4gICAgbGV0IGNlcnRpZmljYXRlOiBzdHJpbmc7XHJcbiAgICBsZXQgaW5wdXRTdHJlYW06IGphdmEuaW8uRmlsZUlucHV0U3RyZWFtO1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IGZpbGUgPSBuZXcgamF2YS5pby5GaWxlKG9wdGlvbnMuY2VydGlmaWNhdGUpO1xyXG4gICAgICBpbnB1dFN0cmVhbSA9IG5ldyBqYXZhLmlvLkZpbGVJbnB1dFN0cmVhbShmaWxlKTtcclxuICAgICAgbGV0IHg1MDlDZXJ0aWZpY2F0ZSA9IGphdmEuc2VjdXJpdHkuY2VydC5DZXJ0aWZpY2F0ZUZhY3RvcnkuZ2V0SW5zdGFuY2UoJ1g1MDknKS5nZW5lcmF0ZUNlcnRpZmljYXRlKGlucHV0U3RyZWFtKTtcclxuICAgICAgcGVlci54NTA5Q2VydGlmaWNhdGUgPSB4NTA5Q2VydGlmaWNhdGU7XHJcbiAgICAgIGNlcnRpZmljYXRlID0gb2todHRwMy5DZXJ0aWZpY2F0ZVBpbm5lci5waW4oeDUwOUNlcnRpZmljYXRlKTtcclxuICAgICAgaW5wdXRTdHJlYW0uY2xvc2UoKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKGlucHV0U3RyZWFtKSB7XHJcbiAgICAgICAgICBpbnB1dFN0cmVhbS5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ25hdGl2ZXNjcmlwdC1odHRwcyA+IGVuYWJsZVNTTFBpbm5pbmcgZXJyb3InLCBlcnJvcik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHBlZXIuaG9zdCA9IG9wdGlvbnMuaG9zdDtcclxuICAgIHBlZXIuY29tbW9uTmFtZSA9IG9wdGlvbnMuY29tbW9uTmFtZSB8fCBvcHRpb25zLmhvc3Q7XHJcbiAgICBwZWVyLmNlcnRpZmljYXRlID0gY2VydGlmaWNhdGU7XHJcbiAgICBpZiAob3B0aW9ucy5hbGxvd0ludmFsaWRDZXJ0aWZpY2F0ZXMgPT09IHRydWUpIHtcclxuICAgICAgcGVlci5hbGxvd0ludmFsaWRDZXJ0aWZpY2F0ZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMudmFsaWRhdGVzRG9tYWluTmFtZSA9PT0gZmFsc2UpIHtcclxuICAgICAgcGVlci52YWxpZGF0ZXNEb21haW5OYW1lID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHBlZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgZ2V0Q2xpZW50KHRydWUpO1xyXG4gIGNvbnNvbGUubG9nKCduYXRpdmVzY3JpcHQtaHR0cHMgPiBFbmFibGVkIFNTTCBwaW5uaW5nJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU1NMUGlubmluZygpIHtcclxuICBwZWVyLmVuYWJsZWQgPSBmYWxzZTtcclxuICBnZXRDbGllbnQodHJ1ZSk7XHJcbiAgY29uc29sZS5sb2coJ25hdGl2ZXNjcmlwdC1odHRwcyA+IERpc2FibGVkIFNTTCBwaW5uaW5nJyk7XHJcbn1cclxuXHJcbmNvbnNvbGUuaW5mbygnbmF0aXZlc2NyaXB0LWh0dHBzID4gRGlzYWJsZWQgU1NMIHBpbm5pbmcgYnkgZGVmYXVsdCcpO1xyXG5cclxubGV0IENsaWVudDogb2todHRwMy5Pa0h0dHBDbGllbnQ7XHJcblxyXG5mdW5jdGlvbiBnZXRDbGllbnQocmVsb2FkOiBib29sZWFuID0gZmFsc2UsIHRpbWVvdXQ6IG51bWJlciA9IDEwKTogb2todHRwMy5Pa0h0dHBDbGllbnQge1xyXG4gIC8vIGlmICghQ2xpZW50KSB7XHJcbiAgLy8gXHRDbGllbnQgPSBuZXcgb2todHRwMy5Pa0h0dHBDbGllbnQoKVxyXG4gIC8vIH1cclxuICAvLyBpZiAoQ2xpZW50KSB7XHJcbiAgLy8gXHRDbGllbnQuY29ubmVjdGlvblBvb2woKS5ldmljdEFsbCgpXHJcbiAgLy8gXHRDbGllbnQgPSBudWxsXHJcbiAgLy8gfVxyXG4gIGlmIChDbGllbnQgJiYgcmVsb2FkID09PSBmYWxzZSAmJiBfdGltZW91dCA9PT0gdGltZW91dCkge1xyXG4gICAgcmV0dXJuIENsaWVudDtcclxuICB9XHJcblxyXG4gIF90aW1lb3V0ID0gdGltZW91dDtcclxuXHJcbiAgbGV0IGNsaWVudCA9IG5ldyBva2h0dHAzLk9rSHR0cENsaWVudC5CdWlsZGVyKCk7XHJcbiAgaWYgKHBlZXIuZW5hYmxlZCA9PT0gdHJ1ZSkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ3BlZXInLCBwZWVyKVxyXG4gICAgaWYgKHBlZXIuaG9zdCB8fCBwZWVyLmNlcnRpZmljYXRlKSB7XHJcbiAgICAgIGxldCBzcGVjID0gb2todHRwMy5Db25uZWN0aW9uU3BlYy5NT0RFUk5fVExTO1xyXG4gICAgICBjbGllbnQuY29ubmVjdGlvblNwZWNzKGphdmEudXRpbC5Db2xsZWN0aW9ucy5zaW5nbGV0b25MaXN0KHNwZWMpKTtcclxuXHJcbiAgICAgIGxldCBwaW5uZXIgPSBuZXcgb2todHRwMy5DZXJ0aWZpY2F0ZVBpbm5lci5CdWlsZGVyKCk7XHJcbiAgICAgIHBpbm5lci5hZGQocGVlci5ob3N0LCBbcGVlci5jZXJ0aWZpY2F0ZV0pO1xyXG4gICAgICBjbGllbnQuY2VydGlmaWNhdGVQaW5uZXIocGlubmVyLmJ1aWxkKCkpO1xyXG5cclxuICAgICAgaWYgKHBlZXIuYWxsb3dJbnZhbGlkQ2VydGlmaWNhdGVzID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBsZXQgeDUwOUNlcnRpZmljYXRlID0gcGVlci54NTA5Q2VydGlmaWNhdGU7XHJcbiAgICAgICAgICBsZXQga2V5U3RvcmUgPSBqYXZhLnNlY3VyaXR5LktleVN0b3JlLmdldEluc3RhbmNlKFxyXG4gICAgICAgICAgICAgIGphdmEuc2VjdXJpdHkuS2V5U3RvcmUuZ2V0RGVmYXVsdFR5cGUoKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGtleVN0b3JlLmxvYWQobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAvLyBrZXlTdG9yZS5zZXRDZXJ0aWZpY2F0ZUVudHJ5KHBlZXIuaG9zdCwgeDUwOUNlcnRpZmljYXRlKVxyXG4gICAgICAgICAga2V5U3RvcmUuc2V0Q2VydGlmaWNhdGVFbnRyeSgnQ0EnLCB4NTA5Q2VydGlmaWNhdGUpO1xyXG5cclxuICAgICAgICAgIC8vIGxldCBrZXlNYW5hZ2VyRmFjdG9yeSA9IGphdmF4Lm5ldC5zc2wuS2V5TWFuYWdlckZhY3RvcnkuZ2V0SW5zdGFuY2UoXHJcbiAgICAgICAgICAvLyBcdGphdmF4Lm5ldC5zc2wuS2V5TWFuYWdlckZhY3RvcnkuZ2V0RGVmYXVsdEFsZ29yaXRobSgpXHJcbiAgICAgICAgICAvLyApXHJcbiAgICAgICAgICBsZXQga2V5TWFuYWdlckZhY3RvcnkgPSBqYXZheC5uZXQuc3NsLktleU1hbmFnZXJGYWN0b3J5LmdldEluc3RhbmNlKCdYNTA5Jyk7XHJcbiAgICAgICAgICBrZXlNYW5hZ2VyRmFjdG9yeS5pbml0KGtleVN0b3JlLCBudWxsKTtcclxuICAgICAgICAgIGxldCBrZXlNYW5hZ2VycyA9IGtleU1hbmFnZXJGYWN0b3J5LmdldEtleU1hbmFnZXJzKCk7XHJcblxyXG4gICAgICAgICAgbGV0IHRydXN0TWFuYWdlckZhY3RvcnkgPSBqYXZheC5uZXQuc3NsLlRydXN0TWFuYWdlckZhY3RvcnkuZ2V0SW5zdGFuY2UoXHJcbiAgICAgICAgICAgICAgamF2YXgubmV0LnNzbC5UcnVzdE1hbmFnZXJGYWN0b3J5LmdldERlZmF1bHRBbGdvcml0aG0oKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRydXN0TWFuYWdlckZhY3RvcnkuaW5pdChrZXlTdG9yZSk7XHJcblxyXG4gICAgICAgICAgbGV0IHNzbENvbnRleHQgPSBqYXZheC5uZXQuc3NsLlNTTENvbnRleHQuZ2V0SW5zdGFuY2UoJ1RMUycpO1xyXG4gICAgICAgICAgc3NsQ29udGV4dC5pbml0KGtleU1hbmFnZXJzLCB0cnVzdE1hbmFnZXJGYWN0b3J5LmdldFRydXN0TWFuYWdlcnMoKSwgbmV3IGphdmEuc2VjdXJpdHkuU2VjdXJlUmFuZG9tKCkpO1xyXG4gICAgICAgICAgY2xpZW50LnNzbFNvY2tldEZhY3Rvcnkoc3NsQ29udGV4dC5nZXRTb2NrZXRGYWN0b3J5KCkpO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignbmF0aXZlc2NyaXB0LWh0dHBzID4gY2xpZW50LmFsbG93SW52YWxpZENlcnRpZmljYXRlcyBlcnJvcicsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwZWVyLnZhbGlkYXRlc0RvbWFpbk5hbWUgPT09IHRydWUpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY2xpZW50Lmhvc3RuYW1lVmVyaWZpZXIobmV3IGphdmF4Lm5ldC5zc2wuSG9zdG5hbWVWZXJpZmllcih7XHJcbiAgICAgICAgICAgIHZlcmlmeTogKGhvc3RuYW1lOiBzdHJpbmcsIHNlc3Npb246IGphdmF4Lm5ldC5zc2wuU1NMU2Vzc2lvbik6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgIGxldCBwcCA9IHNlc3Npb24uZ2V0UGVlclByaW5jaXBhbCgpLmdldE5hbWUoKTtcclxuICAgICAgICAgICAgICBsZXQgaHYgPSBqYXZheC5uZXQuc3NsLkh0dHBzVVJMQ29ubmVjdGlvbi5nZXREZWZhdWx0SG9zdG5hbWVWZXJpZmllcigpO1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIGh2LnZlcmlmeShwZWVyLmhvc3QsIHNlc3Npb24pICYmXHJcbiAgICAgICAgICAgICAgICAgIHBlZXIuaG9zdCA9PT0gaG9zdG5hbWUgJiZcclxuICAgICAgICAgICAgICAgICAgcGVlci5ob3N0ID09PSBzZXNzaW9uLmdldFBlZXJIb3N0KCkgJiZcclxuICAgICAgICAgICAgICAgICAgcHAuaW5kZXhPZihwZWVyLmNvbW1vbk5hbWUpICE9PSAtMVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ25hdGl2ZXNjcmlwdC1odHRwcyA+IGNsaWVudC52YWxpZGF0ZXNEb21haW5OYW1lIGVycm9yJywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignbmF0aXZlc2NyaXB0LWh0dHBzID4gVW5kZWZpbmVkIGhvc3Qgb3IgY2VydGlmaWNhdGUuIFNTTCBwaW5uaW5nIE5PVCB3b3JraW5nISEhJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgY29ubmVjdGlvbiB0aW1lb3V0IHRvIG92ZXJyaWRlIG9raHR0cDMgZGVmYXVsdFxyXG4gIGlmICh0aW1lb3V0KSB7XHJcbiAgICBjbGllbnRcclxuICAgICAgICAuY29ubmVjdFRpbWVvdXQodGltZW91dCwgamF2YS51dGlsLmNvbmN1cnJlbnQuVGltZVVuaXQuU0VDT05EUylcclxuICAgICAgICAud3JpdGVUaW1lb3V0KHRpbWVvdXQsIGphdmEudXRpbC5jb25jdXJyZW50LlRpbWVVbml0LlNFQ09ORFMpXHJcbiAgICAgICAgLnJlYWRUaW1lb3V0KHRpbWVvdXQsIGphdmEudXRpbC5jb25jdXJyZW50LlRpbWVVbml0LlNFQ09ORFMpO1xyXG4gIH1cclxuXHJcbiAgQ2xpZW50ID0gY2xpZW50LmJ1aWxkKCk7XHJcbiAgcmV0dXJuIENsaWVudDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3Qob3B0czogSHR0cHMuSHR0cHNSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8SHR0cHMuSHR0cHNSZXNwb25zZT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgY2xpZW50ID0gZ2V0Q2xpZW50KGZhbHNlLCBvcHRzLnRpbWVvdXQpO1xyXG5cclxuICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgb2todHRwMy5SZXF1ZXN0LkJ1aWxkZXIoKTtcclxuICAgICAgcmVxdWVzdC51cmwob3B0cy51cmwpO1xyXG5cclxuICAgICAgaWYgKG9wdHMuaGVhZGVycykge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdHMuaGVhZGVycykuZm9yRWFjaChrZXkgPT4gcmVxdWVzdC5hZGRIZWFkZXIoa2V5LCBvcHRzLmhlYWRlcnNba2V5XSBhcyBhbnkpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbWV0aG9kcyA9IHtcclxuICAgICAgICAnR0VUJzogJ2dldCcsXHJcbiAgICAgICAgJ0hFQUQnOiAnaGVhZCcsXHJcbiAgICAgICAgJ0RFTEVURSc6ICdkZWxldGUnLFxyXG4gICAgICAgICdQT1NUJzogJ3Bvc3QnLFxyXG4gICAgICAgICdQVVQnOiAncHV0JyxcclxuICAgICAgICAnUEFUQ0gnOiAncGF0Y2gnXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoKFsnR0VUJywgJ0hFQUQnXS5pbmRleE9mKG9wdHMubWV0aG9kKSAhPT0gLTEpIHx8IChvcHRzLm1ldGhvZCA9PT0gJ0RFTEVURScgJiYgIWlzRGVmaW5lZChvcHRzLmJvZHkpKSkge1xyXG4gICAgICAgIHJlcXVlc3RbbWV0aG9kc1tvcHRzLm1ldGhvZF1dKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHR5cGUgPSBvcHRzLmhlYWRlcnMgJiYgb3B0cy5oZWFkZXJzWydDb250ZW50LVR5cGUnXSA/IDxzdHJpbmc+b3B0cy5oZWFkZXJzWydDb250ZW50LVR5cGUnXSA6ICdhcHBsaWNhdGlvbi9qc29uJztcclxuICAgICAgICBsZXQgYm9keSA9IDxhbnk+b3B0cy5ib2R5IHx8IHt9O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XHJcbiAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3RbbWV0aG9kc1tvcHRzLm1ldGhvZF1dKG9raHR0cDMuUmVxdWVzdEJvZHkuY3JlYXRlKFxyXG4gICAgICAgICAgICBva2h0dHAzLk1lZGlhVHlwZS5wYXJzZSh0eXBlKSxcclxuICAgICAgICAgICAgYm9keVxyXG4gICAgICAgICkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBXZSBoYXZlIHRvIGFsbG93IG5ldHdvcmtpbmcgb24gdGhlIG1haW4gdGhyZWFkIGJlY2F1c2UgbGFyZ2VyIHJlc3BvbnNlcyB3aWxsIGNyYXNoIHRoZSBhcHAgd2l0aCBhbiBOZXR3b3JrT25NYWluVGhyZWFkRXhjZXB0aW9uLlxyXG4gICAgICAvLyBOb3RlIHRoYXQgaXQgd291bGQgcHJvYmFibHkgYmUgYmV0dGVyIHRvIG9mZmxvYWQgaXQgdG8gYSBXb3JrZXIgb3IgKG5hdGl2ZWx5IHJ1bm5pbmcpIEFzeW5jVGFzay5cclxuICAgICAgLy8gQWxzbyBub3RlIHRoYXQgb25jZSBzZXQsIHRoaXMgcG9saWN5IHJlbWFpbnMgYWN0aXZlIHVudGlsIHRoZSBhcHAgaXMga2lsbGVkLlxyXG4gICAgICBpZiAob3B0cy5hbGxvd0xhcmdlUmVzcG9uc2UpIHtcclxuICAgICAgICBhbmRyb2lkLm9zLlN0cmljdE1vZGUuc2V0VGhyZWFkUG9saWN5KGFuZHJvaWQub3MuU3RyaWN0TW9kZS5UaHJlYWRQb2xpY3kuTEFYKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2xpZW50Lm5ld0NhbGwocmVxdWVzdC5idWlsZCgpKS5lbnF1ZXVlKG5ldyBva2h0dHAzLkNhbGxiYWNrKHtcclxuICAgICAgICBvblJlc3BvbnNlOiAodGFzaywgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdvblJlc3BvbnNlJylcclxuICAgICAgICAgIC8vIGNvbnNvbGUua2V5cygncmVzcG9uc2UnLCByZXNwb25zZSlcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdvblJlc3BvbnNlID4gcmVzcG9uc2UuaXNTdWNjZXNzZnVsKCknLCByZXNwb25zZS5pc1N1Y2Nlc3NmdWwoKSlcclxuXHJcbiAgICAgICAgICAvLyBsZXQgYm9keSA9IHJlc3BvbnNlLmJvZHkoKS8vLmJ5dGVzKClcclxuICAgICAgICAgIC8vIGNvbnNvbGUua2V5cygnYm9keScsIGJvZHkpXHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYm9keS5jb250ZW50VHlwZSgpJywgYm9keS5jb250ZW50VHlwZSgpKVxyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2JvZHkuY29udGVudFR5cGUoKS50b1N0cmluZygpJywgYm9keS5jb250ZW50VHlwZSgpLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYm9keS5ieXRlcygpJywgYm9keS5ieXRlcygpKVxyXG4gICAgICAgICAgLy8gY29uc29sZS5kdW1wKCd3dGYnLCB3dGYpXHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnb3B0cy51cmwnLCBvcHRzLnVybClcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdib2R5LnN0cmluZygpJywgYm9keS5zdHJpbmcoKSlcclxuXHJcbiAgICAgICAgICAvLyBsZXQgY29udGVudDogYW55ID0gcmVzcG9uc2UuYm9keSgpLnN0cmluZygpXHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY29udGVudCcsIGNvbnRlbnQpXHJcbiAgICAgICAgICAvLyB0cnkge1xyXG4gICAgICAgICAgLy8gXHRjb250ZW50ID0gSlNPTi5wYXJzZShyZXNwb25zZS5ib2R5KCkuc3RyaW5nKCkpXHJcbiAgICAgICAgICAvLyB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgLy8gXHRyZXR1cm4gcmVqZWN0KGVycm9yKVxyXG4gICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgIGxldCBjb250ZW50ID0gcmVzcG9uc2UuYm9keSgpLnN0cmluZygpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBsZXQgc3RhdHVzQ29kZSA9IHJlc3BvbnNlLmNvZGUoKTtcclxuXHJcbiAgICAgICAgICBsZXQgaGVhZGVycyA9IHt9O1xyXG4gICAgICAgICAgbGV0IGhlYWRzOiBva2h0dHAzLkhlYWRlcnMgPSByZXNwb25zZS5oZWFkZXJzKCk7XHJcbiAgICAgICAgICBsZXQgaTogbnVtYmVyLCBsZW46IG51bWJlciA9IGhlYWRzLnNpemUoKTtcclxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gaGVhZHMubmFtZShpKTtcclxuICAgICAgICAgICAgaGVhZGVyc1trZXldID0gaGVhZHMudmFsdWUoaSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmVzb2x2ZSh7Y29udGVudCwgc3RhdHVzQ29kZSwgaGVhZGVyc30pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25GYWlsdXJlOiAodGFzaywgZXJyb3IpID0+IHtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSkpO1xyXG5cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59XHJcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hcHAuY3NzXCI6IFwiLi9hcHAuY3NzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi8gc3luYyBeXFxcXC5cXFxcL2FwcFxcXFwuKGNzc3xzY3NzfGxlc3N8c2FzcykkXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5jc3NcIjogXCIuL2FwcC5jc3NcIixcblx0XCIuL2FwcC50c1wiOiBcIi4vYXBwLnRzXCIsXG5cdFwiLi9tYWluLXBhZ2UudHNcIjogXCIuL21haW4tcGFnZS50c1wiLFxuXHRcIi4vbWFpbi1wYWdlLnhtbFwiOiBcIi4vbWFpbi1wYWdlLnhtbFwiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSB7IC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBpZDtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgcmVjdXJzaXZlICg/PCFcXFxcYkFwcF9SZXNvdXJjZXNcXFxcYi4qKVxcXFwuKHhtbHxjc3N8anN8KD88IVxcXFwuZFxcXFwuKXRzfCg/PCFcXFxcYl9bXFxcXHctXSpcXFxcLilzY3NzKSRcIjsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBJbXBvcnRzXG5leHBvcnRzLmkocmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNyFuYXRpdmVzY3JpcHQtdGhlbWUtY29yZS9jc3MvY29yZS5saWdodC5jc3NcIiksIFwiXCIpO1xuXG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcclxcblwiLCBcIlwiXSk7XG5cbjsgXG5pZiAobW9kdWxlLmhvdCAmJiBnbG9iYWwuX2lzTW9kdWxlTG9hZGVkRm9yVUkgJiYgZ2xvYmFsLl9pc01vZHVsZUxvYWRlZEZvclVJKFwiLi9hcHAuY3NzXCIpICkge1xuICAgIFxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgZ2xvYmFsLmhtclJlZnJlc2goeyB0eXBlOiBcInN0eWxlXCIsIHBhdGg6IFwiLi9hcHAuY3NzXCIgfSk7XG4gICAgfSk7XG59ICIsImltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24nO1xyXG5cclxuYXBwbGljYXRpb24ucnVuKHttb2R1bGVOYW1lOiBcIm1haW4tcGFnZVwifSk7XHJcbiIsImltcG9ydCAqIGFzIEh0dHBzIGZyb20gJ25hdGl2ZXNjcmlwdC1odHRwcyc7XHJcbmltcG9ydCAqIGFzIE9ic2VydmFibGUgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtJztcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3MnO1xyXG5pbXBvcnQgKiBhcyBQYWdlIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogUGFnZS5OYXZpZ2F0ZWREYXRhKSB7XHJcbiAgbGV0IHBhZ2UgPSBhcmdzLm9iamVjdCBhcyBQYWdlLlBhZ2U7XHJcbiAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IE9ic2VydmFibGUuZnJvbU9iamVjdCh7ZW5hYmxlZDogZmFsc2V9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UmVxdWVzdCh1cmw6IHN0cmluZywgYWxsb3dMYXJnZVJlc3BvbnNlID0gZmFsc2UpIHtcclxuICBIdHRwcy5yZXF1ZXN0KFxyXG4gICAgICB7XHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgdGltZW91dDogMSxcclxuICAgICAgICBhbGxvd0xhcmdlUmVzcG9uc2VcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gY29uc29sZS5sb2coJ0h0dHBzLnJlcXVlc3QgcmVzcG9uc2UnLCByZXNwb25zZSkpXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignSHR0cHMucmVxdWVzdCBlcnJvcicsIGVycm9yKTtcclxuICAgICAgICBkaWFsb2dzLmFsZXJ0KGVycm9yKTtcclxuICAgICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc3RSZXF1ZXN0KHVybDogc3RyaW5nLCBib2R5OiBhbnkpIHtcclxuICBIdHRwcy5yZXF1ZXN0KFxyXG4gICAgICB7XHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGJvZHlcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gY29uc29sZS5sb2coJ0h0dHBzLnJlcXVlc3QgcmVzcG9uc2UnLCByZXNwb25zZSkpXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignSHR0cHMucmVxdWVzdCBlcnJvcicsIGVycm9yKTtcclxuICAgICAgICBkaWFsb2dzLmFsZXJ0KGVycm9yKTtcclxuICAgICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3N0SHR0cGJpbigpIHtcclxuICBwb3N0UmVxdWVzdCgnaHR0cHM6Ly9odHRwYmluLm9yZy9wb3N0Jywge1wiZm9vXCI6IFwiYmFyXCIsIFwiYmF6XCI6IHVuZGVmaW5lZCwgXCJwbGF6XCI6IG51bGx9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEh0dHBiaW4oKSB7XHJcbiAgZ2V0UmVxdWVzdCgnaHR0cHM6Ly9odHRwYmluLm9yZy9nZXQnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEh0dHBiaW5MYXJnZVJlc3BvbnNlKCkge1xyXG4gIGdldFJlcXVlc3QoJ2h0dHBzOi8vaHR0cGJpbi5vcmcvYnl0ZXMvMTAwMDAwJywgdHJ1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2NrYmluKCkge1xyXG4gIGdldFJlcXVlc3QoJ2h0dHBzOi8vbW9ja2Jpbi5jb20vcmVxdWVzdCcpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlU1NMUGlubmluZyhhcmdzOiBPYnNlcnZhYmxlLkV2ZW50RGF0YSkge1xyXG4gIGxldCBkaXIgPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLmdldEZvbGRlcignYXNzZXRzJyk7XHJcbiAgbGV0IGNlcnRpZmljYXRlID0gZGlyLmdldEZpbGUoJ2h0dHBiaW4ub3JnLmNlcicpLnBhdGg7XHJcbiAgSHR0cHMuZW5hYmxlU1NMUGlubmluZyh7aG9zdDogJ2h0dHBiaW4ub3JnJywgY29tbW9uTmFtZTogXCJodHRwYmluLm9yZ1wiLCBjZXJ0aWZpY2F0ZX0pO1xyXG4gIGNvbnNvbGUubG9nKCdlbmFibGVkJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVTU0xQaW5uaW5nRXhwaXJlZChhcmdzOiBPYnNlcnZhYmxlLkV2ZW50RGF0YSkge1xyXG4gIGxldCBkaXIgPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLmdldEZvbGRlcignYXNzZXRzJyk7XHJcbiAgbGV0IGNlcnRpZmljYXRlID0gZGlyLmdldEZpbGUoJ2h0dHBiaW4ub3JnLmV4cGlyZWQuY2VyJykucGF0aDtcclxuICBIdHRwcy5lbmFibGVTU0xQaW5uaW5nKHtob3N0OiAnaHR0cGJpbi5vcmcnLCBjZXJ0aWZpY2F0ZX0pO1xyXG4gIGNvbnNvbGUubG9nKCdlbmFibGVkJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU1NMUGlubmluZyhhcmdzOiBPYnNlcnZhYmxlLkV2ZW50RGF0YSkge1xyXG4gIEh0dHBzLmRpc2FibGVTU0xQaW5uaW5nKCk7XHJcbiAgY29uc29sZS5sb2coJ2Rpc2FibGVkJyk7XHJcbn1cclxuXHJcblxyXG4iLCJcbm1vZHVsZS5leHBvcnRzID0gXCI8UGFnZSBjbGFzcz1cXFwicGFnZVxcXCIgbmF2aWdhdGluZ1RvPVxcXCJvbk5hdmlnYXRpbmdUb1xcXCI+XFxyXFxuICAgIDxQYWdlLmFjdGlvbkJhcj5cXHJcXG4gICAgICAgIDxBY3Rpb25CYXIgdGl0bGU9XFxcIkhUVFBTIFBsYXlncm91bmRcXFwiIGNsYXNzPVxcXCJhY3Rpb24tYmFyXFxcIj48L0FjdGlvbkJhcj5cXHJcXG4gICAgPC9QYWdlLmFjdGlvbkJhcj5cXHJcXG5cXHJcXG4gICAgPFN0YWNrTGF5b3V0IGNsYXNzPVxcXCJwLTIwXFxcIj5cXHJcXG4gICAgICAgIDxMYWJlbCBjbGFzcz1cXFwiaDEgdGV4dC1jZW50ZXJcXFwiIGNvbG9yPVxcXCJ7eyBlbmFibGVkID8gJ2dyZWVuJyA6ICdyZWQnIH19XFxcIiB0ZXh0PVxcXCJ7eyBlbmFibGVkID8gJ0h0dHBiaW4gU1NMIFBpbm5pbmcgRW5hYmxlZCcgOiAnU1NMIFBpbm5pbmcgRGlzYWJsZWQnIH19XFxcIi8+XFxyXFxuICAgICAgICA8QnV0dG9uIHRleHQ9XFxcIkdFVCBNb2NrYmluXFxcIiB0YXA9XFxcImdldE1vY2tiaW5cXFwiIGNsYXNzPVxcXCJ0LTIwIGJ0biBidG4tcHJpbWFyeSBidG4tYWN0aXZlXFxcIi8+XFxyXFxuICAgICAgICA8QnV0dG9uIHRleHQ9XFxcIkdFVCBIdHRwYmluXFxcIiB0YXA9XFxcImdldEh0dHBiaW5cXFwiIGNsYXNzPVxcXCJ0LTIwIGJ0biBidG4tcHJpbWFyeSBidG4tYWN0aXZlXFxcIi8+XFxyXFxuICAgICAgICA8QnV0dG9uIHRleHQ9XFxcIkdFVCBIdHRwYmluIChsYXJnZSByZXNwb25zZSlcXFwiIHRhcD1cXFwiZ2V0SHR0cGJpbkxhcmdlUmVzcG9uc2VcXFwiIGNsYXNzPVxcXCJ0LTIwIGJ0biBidG4tcHJpbWFyeSBidG4tYWN0aXZlXFxcIi8+XFxyXFxuICAgICAgICA8QnV0dG9uIHRleHQ9XFxcIlBPU1QgSHR0cGJpbiBcXFwiIHRhcD1cXFwicG9zdEh0dHBiaW5cXFwiIGNsYXNzPVxcXCJ0LTIwIGJ0biBidG4tcHJpbWFyeSBidG4tYWN0aXZlXFxcIi8+XFxyXFxuICAgICAgICA8QnV0dG9uIHRleHQ9XFxcIkh0dHBiaW4gUGlubmluZyBPTlxcXCIgdGFwPVxcXCJlbmFibGVTU0xQaW5uaW5nXFxcIiBjbGFzcz1cXFwidC0yMCBidG4gYnRuLXByaW1hcnkgYnRuLWFjdGl2ZVxcXCIvPlxcclxcbiAgICAgICAgPEJ1dHRvbiB0ZXh0PVxcXCJIdHRwYmluIFBpbm5pbmcgT04sIGV4cGlyZWQgY2VydFxcXCIgdGFwPVxcXCJlbmFibGVTU0xQaW5uaW5nRXhwaXJlZFxcXCIgY2xhc3M9XFxcInQtMjAgYnRuIGJ0bi1wcmltYXJ5IGJ0bi1hY3RpdmVcXFwiLz5cXHJcXG4gICAgICAgIDxCdXR0b24gdGV4dD1cXFwiSHR0cGJpbiBQaW5uaW5nIE9GRlxcXCIgdGFwPVxcXCJkaXNhYmxlU1NMUGlubmluZ1xcXCIgY2xhc3M9XFxcInQtMjAgYnRuIGJ0bi1wcmltYXJ5IGJ0bi1hY3RpdmVcXFwiLz5cXHJcXG4gICAgICAgIDxMYWJlbCB0ZXh0PVxcXCJIZXJlJ3MgYSBzcGlubmVyIHRvIHNob3cgdGhlIG1haW4gdGhyZWFkIGlzIG5vdCBibG9ja2VkIGJ5IG5ldHdvcmsgSU9cXFwiIHRleHRXcmFwPVxcXCJ0cnVlXFxcIiBjbGFzcz1cXFwibS0yMFxcXCIvPlxcclxcbiAgICAgICAgPEFjdGl2aXR5SW5kaWNhdG9yIGJ1c3k9XFxcInRydWVcXFwiLz5cXHJcXG4gICAgPC9TdGFja0xheW91dD5cXHJcXG5cXHJcXG48L1BhZ2U+XFxyXFxuXCI7IFxuaWYgKG1vZHVsZS5ob3QgJiYgZ2xvYmFsLl9pc01vZHVsZUxvYWRlZEZvclVJICYmIGdsb2JhbC5faXNNb2R1bGVMb2FkZWRGb3JVSShcIi4vbWFpbi1wYWdlLnhtbFwiKSApIHtcbiAgICBcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogXCJtYXJrdXBcIiwgcGF0aDogXCIuL21haW4tcGFnZS54bWxcIiB9KTtcbiAgICB9KTtcbn0gIl0sInNvdXJjZVJvb3QiOiIifQ==