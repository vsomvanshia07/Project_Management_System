import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from"../../store/slices/deadlineSlice"

const DeadlinesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    projectTitle:"",
    studentName:"",
    supervisor:"",
    deadlineDate:"",
    description:"",
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.admin);
  const [viewProjects, setViewProjects] = useState (projects || [])
  useEffect(() => {
      setViewProjects (projects || []);
    }, [projects]);

    const projectRows = useMemo(()=>{
      return (viewProjects || []).map((p)=>({
        _id: p._id,
        title: p.title,
        studentName: p.student?.name || '-',
        studentEmail: p.student?.email ||'-',
        studentDept: p.student?.department || '-',
        supervisor: p.supervisor?.name || '-',
        deadline: p.deadline
        ? new Date(p.deadline).toISOString().slice(0, 10)
        :"-",
        updatedAt: p.updatedAt
        ? new Date(p.updatedAt).toLocaleString(): "-",
      }));
      }, [viewProjects]);

      const filteredProjects = projectRows.filter(rows =>{
        const matchesSearch =
        (rows.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (rows.studentName || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      });

      const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!selectedProject || !formData.deadlineDate) return ;

        let deadllineData = {
          name: selectedProject?.student?.name,
          dueDate: selectedProject?.deadllineData,
          project: selectedProject?._id,
        };

        try {
          const updated = await dispatch(createDeadline({id:selectedProject._id , data: deadllineData})
        ).unwrap();
        const updatedProject = updated?.project || updated;

        if(updatedProject = updated?.project || updated){
          setViewProjects(prev => prev.map( p => p._id === updatedProject._id ? {...p,...updatedProject}:p
            )
          );
        }

      }
      finally
      {
        setShowModal(false);
        setFormData({
          projectTitle:"",
          studentName:"",
          supervisor:"",
          deadlineDate:"",
          description:"",
        })

        setSelectedProject(null);
        setQuery("");
      }
      };

  return <></>;

      <div className="space-y-6">
        {/* HEADER */}
        <div className="card">
          <div className="card-header flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="card-title">Manage Deadlines</h1>
              <p className=" card-subtitle">
                Create and monitor project deadlines
              </p>
            </div>
            <button
            onClick={()=>setShowModal(true)}
            className="btn-primary mt-4 md:mt-0"
            >
              Create/update Deadline
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex flex-cols md:flex-rpw gap-4">
            <label className="block text-sm font-medium textslate-700 mb-2">Search deadline</label>
            <input type = "text" placeholder="Search by project or student..."
            classname="input-field w-full"
            value = {searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
          </div>
        </div>

      </div>
};

export default DeadlinesPage;
