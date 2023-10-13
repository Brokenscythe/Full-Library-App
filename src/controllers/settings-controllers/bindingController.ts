import { Request, Response, NextFunction } from "express";
import Binding from "../../models/bindingModel";

export async function getAllbindings(req: Request, res: Response, next: NextFunction) {
  try {
    const bindings = await Binding.getAllBindings();
    console.log(bindings);
    res.render("settings/settingsPovez", { bindings: bindings });
  } catch (error) {
    return next(error);
  }
}

export async function getBinding(req: Request, res: Response, next: NextFunction) {
  const bindingId = parseInt(req.params.id);
  let binding;
  try {
    binding = await Binding.getBinding(bindingId);
    res.render("povez/editPovez", { binding: binding });
  } catch (error) {
    return next(error);
  }
}
export async function getNewBinding(req: Request, res) {
  res.render("povez/noviPovez");
}

export async function addBinding(req: Request, res: Response, next: NextFunction) {
  const bindingName = req.body.name.toString();
  let binding;
  try {
    binding = new Binding(bindingName);
    await binding.save();
    res.redirect("/settingsPovez");
  } catch (error) {
    return next(error);
  }
}

export async function updateBinding(req: Request, res: Response, next: NextFunction) {
  const bindingId = parseInt(req.params.id);
  const name = req.body.binding.toString();
  console.log(bindingId);
  console.log(name);
  try {
    const binding = new Binding(name, bindingId);
    await binding.save();
    res.redirect("/settingsPovez");
  } catch (error) {
    return next(error);
  }
}

export async function deleteBinding(req: Request, res: Response, next: NextFunction) {
  const bindingId = parseInt(req.params.id);
  console.log("Deleting binding with ID:", bindingId);
  try {
    const binding = new Binding("", bindingId);
    await binding.delete();
    console.log("Binding deleted successfully");
    res.redirect("/settingsPovez");
  } catch (error) {
    return next(error);
  }
}
