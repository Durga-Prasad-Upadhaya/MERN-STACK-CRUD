import Emp from "../model/employeeModel.js";

const getEmployees = async (req, res) => {
  const e = await Emp.find();
  if (e.length != 0) res.status(200).json(e);
  else res.status(404).json({ message: "Record Not Found" });
};

const getEmployee = async (req, res) => {
  const e = await Emp.findById(req.params.id);
  if (!e) res.status(404).json({ message: "Record Not Found" });
  else res.status(200).json(e);
};

const createEmployee = async (req, res) => {
  const { ename, email, emobile } = req.body;
  if (!ename || !email || !emobile)
    res.status(404).json({ message: "Missing Fields" });
  else {
    await Emp.create({ ename, email, emobile });
    res.status(201).json({ message: "Successfully Created Record!" });
  }
};

const updateEmpoyee = async (req, res) => {
  const e = await Emp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (e) res.status(200).json({ message: "Record Sucessfully Updated!" });
  else res.status(404).json({ message: "Record Not Found" });
};

const deleteEmployee = async (req, res) => {
  const e = await Emp.findByIdAndRemove(req.params.id);
  if (e) res.status(200).json({ message: "Record Deleted" });
  else res.status(404).json({ message: "Record Not Found" });
};

const deleteAllEmployee = async (req, res) => {
  const e = await Emp.deleteMany({});
  if (e.deletedCount > 0)
    res.status(200).json({ message: "Sucessfully Deleted All Records" });
  else res.status(404).json({ message: "No Records Found" });
};

export {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmpoyee,
  deleteEmployee,
  deleteAllEmployee,
};
