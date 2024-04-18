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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const radio_browser_api_1 = require("radio-browser-api");
const app = (0, express_1.default)();
const port = 3002;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/filters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genre = req.query.genre;
        const api = new radio_browser_api_1.RadioBrowserApi('My Radio App');
        const stationsData = yield api.searchStations({
            language: 'english',
            tag: genre,
            limit: 200,
        });
        res.json(stationsData);
    }
    catch (error) {
        console.error('Error fetching data from Radio Browser API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchterm = req.query.searchterm;
        if (!searchterm) {
            return res.status(400).json({ error: 'Search term is required' });
        }
        const api = new radio_browser_api_1.RadioBrowserApi('My Radio App');
        const stationsData = yield api.searchStations({
            language: 'english',
            name: searchterm,
            limit: 200,
        });
        res.json(stationsData);
    }
    catch (error) {
        console.error('Error fetching data from Radio Browser API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
