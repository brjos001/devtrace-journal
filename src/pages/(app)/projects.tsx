
import { FolderKanban, Plus, Search } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesign and improve the company website.",
      status: "In Progress",
      progress: 65,
    },
    {
      id: 2,
      name: "Mobile App",
      description: "Develop the new mobile application.",
      status: "Planning",
      progress: 20,
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Launch the upcoming marketing campaign.",
      status: "Completed",
      progress: 100,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-500 mt-1">
            Manage and track all your projects.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Project Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <FolderKanban
                className="text-blue-600"
                size={24}
              />

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {project.status}
              </span>
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              {project.name}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {project.description}
            </p>

            {/* Progress */}
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">
                  {project.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <button className="mt-5 w-full rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50">
              View Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
