import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStudent, createTeacher } from "../../store/slices/adminSlice";
import {
  toggleTeacherModel,
  togglStudentModel,
} from "../../store/slices/popupSlice";
import { X } from "lucide-react";
const AddTeacher = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    experties: "",
    maxStudents: 1,
  });

  const handleCreateTeacher = (e) => {
    e.preventDefault();
    dispatch(createTeacher(formData));
    setFormData({
      name: "",
      email: "",
      department: "",
      password: "",
      experties: "",
      maxStudents: 1,
    });
    dispatch(toggleTeacherModel());
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flexitems-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Add Teacher
            </h3>
            <button
              onClick={() => dispatch(toggleTeacherModel())}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="x-6h-6" />
            </button>
          </div>

          <form onClick={handleCreateTeacher} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input-field w-full py-1 border-b border-slate-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input-field w-full py-1 border-b border-slate-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="input-field w-full py-1 border-b border-slate-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Department
              </label>
              <select
                className="input-field w-full py-1 border-b border-slate-600 focus:outline-none"
                required
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Softeare Engineering">
                  Softeare Engineering
                </option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Data Science">Data Science</option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Business Administration">
                  Business Administration
                </option>
                <option value="Economics">Economics</option>
                <option value="Psychology">Psychology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Expertise
              </label>
              <select
                className="input-field w-full py-1 border-b border-slate-600 focus:outline-none"
                required
                value={formData.experties}
                onChange={(e) =>
                  setFormData({ ...formData, experties: e.target.value })
                }
              >
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Science">Data Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App System">Mobile App System</option>
                <option value="Computer Network">Computer Network</option>
                <option value="Operating System">Operating System</option>
                <option value="Human-Computer Interaction">
                  Human-Computer Interaction
                </option>
                <option value="Big Data Analytics">Big Data Analytics</option>
                <option value="Blockchain Technology">
                  Blockchain Technology
                </option>
                <option value="Internet Of Things (Iot)">
                  Internet Of Things (Iot)
                </option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => dispatch(toggleTeacherModel())}
                className="btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTeacher;
