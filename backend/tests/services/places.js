"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const places_1 = __importDefault(require("../../src/services/places"));
const getFakeData = () => __awaiter(void 0, void 0, void 0, function* () {
    const fake = yield Promise.resolve().then(() => __importStar(require('./fake.json')));
    return { data: fake };
});
describe('Places Service', () => {
    beforeEach(() => {
        jest.spyOn(axios_1.default, 'get').mockImplementation(getFakeData);
    });
    it('should get all places', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield places_1.default.getAll();
        expect(result.meta.page).toEqual(null);
        expect(result.meta.limit).toEqual(null);
        expect(result.meta.count).toEqual('2303');
        expect(result.data.length).toBe(7);
        expect(result.data[0].name.fi).toEqual('fake');
    }));
    it('should paginate places response', () => __awaiter(void 0, void 0, void 0, function* () {
        const result1 = yield places_1.default.getAll(1, 4);
        const result2 = yield places_1.default.getAll(3, 2);
        expect(result1.meta.count).toEqual('2303');
        expect(result1.meta.page).toEqual(1);
        expect(result1.meta.limit).toEqual(4);
        expect(result1.data.length).toBe(4);
        expect(result1.data[0].name.fi).toEqual('fake');
        expect(result1.data[3].name.fi).toEqual('fake 2');
        expect(result2.meta.page).toEqual(3);
        expect(result2.meta.limit).toEqual(2);
        expect(result2.data.length).toBe(2);
        expect(result2.data[0].name.fi).toEqual('fake 3');
        expect(result2.data[1].name.fi).toEqual('fake 4');
    }));
});
//# sourceMappingURL=places.js.map