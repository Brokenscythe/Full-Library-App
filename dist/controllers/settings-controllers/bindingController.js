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
exports.deleteBinding = exports.updateBinding = exports.addBinding = exports.getNewBinding = exports.getBinding = exports.getAllbindings = void 0;
const bindingModel_1 = __importDefault(require("../../models/bindingModel"));
function getAllbindings(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bindings = yield bindingModel_1.default.getAllBindings();
            console.log(bindings);
            res.render("settings/settingsPovez", { bindings: bindings });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllbindings = getAllbindings;
function getBinding(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bindingId = parseInt(req.params.id);
        let binding;
        try {
            binding = yield bindingModel_1.default.getBinding(bindingId);
            res.render("povez/editPovez", { binding: binding });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getBinding = getBinding;
function getNewBinding(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("povez/noviPovez");
    });
}
exports.getNewBinding = getNewBinding;
function addBinding(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bindingName = req.body.name.toString();
        let binding;
        try {
            binding = new bindingModel_1.default(bindingName);
            yield binding.save();
            res.redirect("/settingsPovez");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.addBinding = addBinding;
function updateBinding(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bindingId = parseInt(req.params.id);
        const name = req.body.binding.toString();
        console.log(bindingId);
        console.log(name);
        try {
            const binding = new bindingModel_1.default(name, bindingId);
            yield binding.save();
            res.redirect("/settingsPovez");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateBinding = updateBinding;
function deleteBinding(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bindingId = parseInt(req.params.id);
        console.log("Deleting binding with ID:", bindingId);
        try {
            const binding = new bindingModel_1.default("", bindingId);
            yield binding.delete();
            console.log("Binding deleted successfully");
            res.redirect("/settingsPovez");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteBinding = deleteBinding;
//# sourceMappingURL=bindingController.js.map