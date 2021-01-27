"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Demonstrate model and schema creation and persistence
  of data with ottoman.save() */
var ottoman_1 = __importDefault(require("ottoman"));
var ottoman_2 = require("ottoman");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use();
ottoman_1.default.connect({
    connectionString: 'couchbase://localhost',
    bucketName: 'travel',
    username: 'Administrator',
    password: 'password'
});
// Create a standard schema for airline Models
var airlineSchema = new ottoman_2.Schema({
    callsign: String,
    country: String,
    name: String
});
// Plugins and Hooks are middleware, think lifecycle hooks!
// They must be created before the Model instance
var pluginLog = function (airlineSchema) {
    airlineSchema.pre('save', function (doc) { return console.log("Saving Document: " + doc.name); });
    airlineSchema.post('save', function (doc) {
        return console.log("Document: " + doc.id + " has been saved");
    });
};
airlineSchema.plugin(pluginLog);
/* Create refdoc index (faster for retrieving docs with id)
  since name is unique we want to create a ref index on our name
  this is immediately consistent by creating a referential doc in db
  in addition to our airline document. For purposes of lookup by key */
airlineSchema.index.findByName = {
    by: 'name',
    type: 'refdoc'
};
// Compile our model using our schema
var Airline = ottoman_2.model('Airline', airlineSchema);
// Constructing our document
var cbAirlines = new Airline({
    callsign: 'Couchbase',
    country: 'United States',
    name: 'Couchbase Airlines'
});
// Persist the Couchbase Airlines document to Couchbase Server
var saveDocument = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // pre and post hooks will run
                return [4 /*yield*/, cbAirlines.save()];
            case 1:
                // pre and post hooks will run
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
// Ensure that all indexes exist on the server
ottoman_1.default.start()
    // Next, let's save our document and print a success message 
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        saveDocument()
            .then(function () { return process.kill(process.pid, 'SIGTERM'); })
            .catch(function (error) { return console.log(error); });
        return [2 /*return*/];
    });
}); });
