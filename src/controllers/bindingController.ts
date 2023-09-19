import { Request, Response, NextFunction } from "express";
import Binding from "../models/bindingModel";

export async function getAllbindings(req: Request, res: Response, next: NextFunction){
    try {
        const bindings = await Binding.getAllBindings();
        console.log(bindings);
        res.render('settings/settingsPovez', { bindings : bindings }); 
    } catch (error) {
        return next(error);
    }
} 

 export async function getBinding(req: Request, res:Response, next:NextFunction){
    const bindingId = parseInt(req.params.id.split(':')[1]);
    let binding;
    try {
        binding = await Binding.getBinding(bindingId);
        res.render('povez/editPovez', {binding:binding});
    }catch(error) {
        return next(error);
    }
}

export async function addBinding(req: Request, res:Response, next:NextFunction){
        const bindingName = req.body.name.toString();
        const binding = new Binding(bindingName);
        console.log(req.body);
        try{
            await binding.save();
            const bindings = await Binding.getAllBindings();
            console.log(bindings);
            res.render('settings/settingsPovez', { bindings : bindings });
        }
        catch(error) {
            return next(error);
        }
}

export async function updateBinding(req: Request, res:Response, next:NextFunction){
    const name = req.body.binding.toString();
    const bindingId = parseInt(req.params.id.split(':')[1]);
    const binding = new Binding(
        name,
        bindingId
    );
    try{
        await binding.save();
        const bindings = await Binding.getAllBindings();
        console.log(bindings);
        res.render('settings/settingsPovez', { bindings : bindings });
    }
    catch(error) {
        return next(error);
    }
}

export async function deleteBinding(req: Request, res:Response, next:NextFunction) {
    const bindingId = parseInt(req.params.id.split(':')[1]);
    const binding = new Binding("", bindingId);
    try{
        await binding.delete();
        const bindings = await Binding.getAllBindings();
        console.log(bindings);
        res.render('settings/settingsPovez', { bindings : bindings });
    }catch(error) {
        return next(error);
    }
}