import React, { useState, useEffect } from "react";
import { Search, MapPin, Clock, Edit2, Trash2 } from "lucide-react";

// This is a placeholder for a proper modal or notification system
const showMessage = (message) => {
  // In a real app, you would use a library like react-hot-toast or a custom modal component
  // For this example, we'll use the browser's alert, but it's not recommended for production.
  alert(message);
};

// --- Helper functions moved outside the component ---

// A helper function to generate random tags for jobs
const generateJobTags = () => {
  const allTags = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "GraphQL",
    "Leadership",
    "Remote",
  ];
  const numTags = Math.floor(Math.random() * 4) + 2; // get 2 to 5 tags
  return allTags.sort(() => 0.5 - Math.random()).slice(0, numTags);
};

// A list of mock jobs to be used as a fallback if API calls fail
const getMockJobs = () => [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full Time",
    salaryRange: "$120,000 - $180,000",
    description:
      "We are looking for a skilled Senior Frontend Developer to join our dynamic team. You'll be responsible for building cutting-edge web applications using modern technologies.",
    datePosted: "2024-09-20",
    applicants: 45,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLabs",
    location: "New York, NY",
    type: "Full Time",
    salaryRange: "$130,000 - $200,000",
    description:
      "Join our product team to drive strategy and execution for our flagship products. Work closely with engineering, design, and business teams to deliver exceptional user experiences.",
    datePosted: "2024-09-19",
    applicants: 67,
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio Pro",
    location: "Remote",
    type: "Contract",
    salaryRange: "$80k - $120k",
    description:
      "Create intuitive and engaging user experiences for web and mobile applications. Collaborate with cross-functional teams to bring innovative design solutions to life.",
    datePosted: "2024-09-18",
    applicants: 23,
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataFlow Analytics",
    location: "London, UK",
    type: "Full Time",
    salaryRange: "£70k - £100k",
    description:
      "Analyze complex datasets to derive actionable insights and build predictive models. Work with cutting-edge machine learning technologies and big data platforms.",
    datePosted: "2024-09-17",
    applicants: 89,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Berlin, Germany",
    type: "Full Time",
    salaryRange: "€85k - €120k",
    description:
      "Build and maintain scalable infrastructure using modern DevOps practices. Work with containerization, CI/CD pipelines, and cloud platforms.",
    datePosted: "2024-09-16",
    applicants: 34,
  },
  {
    id: 6,
    title: "Junior Full Stack Developer",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    type: "Part Time",
    salaryRange: "$60,000 - $90,000",
    description:
      "Join our fast-growing startup to build end-to-end web applications. Work with modern JavaScript frameworks and contribute to all aspects of the development process.",
    datePosted: "2024-09-15",
    applicants: 56,
  },
  {
    id: 7,
    title: "Mobile App Developer",
    company: "AppMakers Inc.",
    location: "New York, NY",
    type: "Remote",
    salaryRange: "$100,000 - $160,000",
    description:
      "Develop native iOS and Android applications using Swift and Kotlin. Focus on creating smooth, responsive user experiences and integrating with backend services.",
    datePosted: "2024-09-14",
    applicants: 41,
  },
];

const enhanceJobsWithDetails = (jobData) => {
  const possibleLocations = [
    "San Francisco, CA",
    "New York, NY",
    "London, UK",
    "Berlin, Germany",
    "Remote",
  ];
  const possibleTypes = ["Full Time", "Part Time", "Contract", "Remote"];

  return jobData.map((item, index) => ({
    id: item.id || Date.now() + index,
    title: item.title || "Software Engineer",
    company: item.company || "Tech Company",
    location:
      item.location ||
      possibleLocations[Math.floor(Math.random() * possibleLocations.length)],
    type:
      item.type ||
      possibleTypes[Math.floor(Math.random() * possibleTypes.length)],
    description:
      item.body || item.description || "A description of the job role.",
    datePosted: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    applicants: Math.floor(Math.random() * 200),
    salaryRange: `$${Math.floor(Math.random() * 50 + 70)}k - $${Math.floor(
      Math.random() * 50 + 120
    )}k`,
    tags: generateJobTags(),
    requirements: [
      `${Math.floor(Math.random() * 5 + 2)}+ years of experience`,
      "Strong knowledge of relevant technologies",
      "Familiarity with testing frameworks",
      "Excellent problem-solving skills",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Unlimited PTO policy",
    ],
  }));
};

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("job-seeker");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [filters, setFilters] = useState({
    jobType: {
      fullTime: false,
      partTime: false,
      contract: false,
      remote: false,
    },
    location: {
      sanFrancisco: false,
      newYork: false,
      london: false,
      berlin: false,
      remote: false,
    },
    experienceLevel: {
      entryLevel: false,
      midLevel: false,
      seniorLevel: false,
    },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Using a mock API for demonstration.
        // In a real application, you would fetch from your actual backend.
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        let data = await response.json();

        const enhancedJobs = enhanceJobsWithDetails(data.slice(0, 20));
        setJobs(enhancedJobs);
        setFilteredJobs(enhancedJobs);
        if (enhancedJobs.length > 0) {
          setSelectedJob(enhancedJobs[0]);
        }
      } catch (error) {
        console.error("Error fetching jobs, using mock data:", error);
        const mockJobs = enhanceJobsWithDetails(getMockJobs());
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
        if (mockJobs.length > 0) {
          setSelectedJob(mockJobs[0]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let results = jobs;

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply checkbox filters
    const activeJobTypes = Object.keys(filters.jobType).filter(
      (key) => filters.jobType[key]
    );
    if (activeJobTypes.length > 0) {
      results = results.filter((job) => {
        const jobType = job.type.toLowerCase().replace(/\s+/g, "");
        return activeJobTypes.some((type) =>
          jobType.includes(type.toLowerCase())
        );
      });
    }

    const activeLocations = Object.keys(filters.location).filter(
      (key) => filters.location[key]
    );
    if (activeLocations.length > 0) {
      const locationMap = {
        sanfrancisco: "san francisco",
        newyork: "new york",
      };
      results = results.filter((job) =>
        activeLocations.some((loc) =>
          job.location.toLowerCase().includes(locationMap[loc] || loc)
        )
      );
    }

    const activeExperienceLevels = Object.keys(filters.experienceLevel).filter(
      (key) => filters.experienceLevel[key]
    );
    if (activeExperienceLevels.length > 0) {
      results = results.filter((job) => {
        const title = job.title.toLowerCase();
        return activeExperienceLevels.some((level) => {
          switch (level) {
            case "entryLevel":
              return (
                !title.includes("senior") &&
                !title.includes("lead") &&
                !title.includes("principal")
              );
            case "midLevel":
              return (
                !title.includes("senior") &&
                !title.includes("junior") &&
                !title.includes("entry") &&
                !title.includes("lead") &&
                !title.includes("principal")
              );
            case "seniorLevel":
              return (
                title.includes("senior") ||
                title.includes("lead") ||
                title.includes("principal")
              );
            default:
              return true;
          }
        });
      });
    }

    setFilteredJobs(results);

    // After filtering, if the selected job is no longer in the list,
    // default to the first job in the new list or null.
    if (selectedJob && !results.find((job) => job.id === selectedJob.id)) {
      setSelectedJob(results.length > 0 ? results[0] : null);
    } else if (!selectedJob && results.length > 0) {
      // If no job is selected, default to the first one in the filtered list
      setSelectedJob(results[0]);
    }
  }, [jobs, searchTerm, filters]);

  const handleApplyJob = (jobId) => {
    if (applications.some((app) => app.jobId === jobId)) return;
    const application = {
      id: Date.now(),
      jobId,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Applied",
    };
    setApplications([...applications, application]);
    setJobs(
      jobs.map((job) =>
        job.id === jobId
          ? { ...job, applicants: (job.applicants || 0) + 1 }
          : job
      )
    );
    showMessage("Application submitted successfully!");
  };

  const handleFilterChange = (category, filter) => {
    setFilters((prev) => ({
      ...prev,
      [category]: { ...prev[category], [filter]: !prev[category][filter] },
    }));
  };

  const handleAddJob = (jobData) => {
    const newJob = enhanceJobsWithDetails([{ ...jobData }])[0];
    const newJobsList = [newJob, ...jobs];

    // Manually update both the master list and the filtered list
    // This ensures the new job appears immediately, regardless of filters.
    setJobs(newJobsList);
    setFilteredJobs(newJobsList);

    // Reset UI elements to show the new job
    setShowJobForm(false);
    setSelectedJob(newJob);
    setSearchTerm("");
    setFilters({
      jobType: {
        fullTime: false,
        partTime: false,
        contract: false,
        remote: false,
      },
      location: {
        sanFrancisco: false,
        newYork: false,
        london: false,
        berlin: false,
        remote: false,
      },
      experienceLevel: {
        entryLevel: false,
        midLevel: false,
        seniorLevel: false,
      },
    });
  };

  const handleUpdateJob = (jobData) => {
    setJobs(
      jobs.map((job) =>
        job.id === editingJob.id ? { ...job, ...jobData } : job
      )
    );
    setShowJobForm(false);
    setEditingJob(null);
    if (selectedJob && selectedJob.id === editingJob.id) {
      setSelectedJob((prev) => ({ ...prev, ...jobData }));
    }
  };

  const handleDeleteJob = (jobId) => {
    // Just update the main jobs list. The useEffect will handle updating
    // the filtered list and the selected job.
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  // A reusable Job Form component for adding and editing jobs
  const JobForm = ({ job, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      title: job?.title || "",
      company: job?.company || "",
      location: job?.location || "",
      type: job?.type || "Full Time",
      salaryRange: job?.salaryRange || "",
      description: job?.description || "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {job ? "Edit Job" : "Add New Job"}
            </h2>
            <div className="space-y-4">
              {["title", "company", "location"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1 capitalize text-gray-600">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Job Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Remote</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Salary Range
                </label>
                <input
                  type="text"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  placeholder="e.g., $120,000 - $180,000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  {job ? "Update Job" : "Add Job"}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">
            Finding great opportunities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header Section */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-blue-600">JobHub</h1>
            <div className="flex items-center space-x-4">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="job-seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
              {userRole === "recruiter" && (
                <button
                  onClick={() => {
                    setEditingJob(null);
                    setShowJobForm(true);
                  }}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors hidden sm:block"
                >
                  Post a Job
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar for Filters - Always Visible */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {[
                ["jobType", "Job Type"],
                ["location", "Location"],
                ["experienceLevel", "Experience Level"],
              ].map(([key, title]) => (
                <div key={key} className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">
                    {title}
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(filters[key]).map(([filterKey, value]) => (
                      <label
                        key={filterKey}
                        className="flex items-center cursor-pointer text-gray-700 hover:text-blue-600"
                      >
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleFilterChange(key, filterKey)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                        />
                        <span className="capitalize">
                          {filterKey.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Middle Section for Job Listings */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {filteredJobs.length} Job Openings
              </h2>
            </div>
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer border-2 ${
                      selectedJob?.id === job.id
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {job.company}
                    </p>
                    <div className="flex items-center text-gray-600 text-sm mb-3 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1.5" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {job.type}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {job.applicants} applicants
                      </span>
                      {userRole === "recruiter" && (
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingJob(job);
                              setShowJobForm(true);
                            }}
                            className="p-2 text-gray-500 hover:bg-blue-100 hover:text-blue-600 rounded-full"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteJob(job.id);
                            }}
                            className="p-2 text-gray-500 hover:bg-red-100 hover:text-red-600 rounded-full"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-gray-600">
                    No jobs match the current filters. Try adjusting your
                    search.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar for Job Details */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              {selectedJob ? (
                <div className="bg-white rounded-lg shadow p-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {selectedJob.title}
                  </h2>
                  <p className="text-blue-600 font-semibold text-lg mb-3">
                    {selectedJob.company}
                  </p>
                  <p className="text-gray-700 font-medium mb-4">
                    {selectedJob.salaryRange}
                  </p>

                  {userRole === "job-seeker" && (
                    <button
                      onClick={() => handleApplyJob(selectedJob.id)}
                      className={`w-full py-3 mb-6 rounded-lg font-medium transition-colors ${
                        applications.some((app) => app.jobId === selectedJob.id)
                          ? "bg-green-100 text-green-700 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      disabled={applications.some(
                        (app) => app.jobId === selectedJob.id
                      )}
                    >
                      {applications.some((app) => app.jobId === selectedJob.id)
                        ? "Applied"
                        : "Apply Now"}
                    </button>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 border-b pb-2">
                        Job Description
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {selectedJob.description}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 border-b pb-2">
                        Requirements
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {selectedJob.requirements?.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 border-b pb-2">
                        Benefits
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {selectedJob.benefits?.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-gray-600">
                    No jobs available. Please try again later or adjust your
                    filters.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      {showJobForm && (
        <JobForm
          job={editingJob}
          onSubmit={editingJob ? handleUpdateJob : handleAddJob}
          onCancel={() => {
            setShowJobForm(false);
            setEditingJob(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
