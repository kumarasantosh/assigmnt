import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  User,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

const JobPortalApp = () => {
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
      fullTime: true,
      partTime: true,
      contract: true,
      remote: true,
    },
    location: {
      sanFrancisco: true,
      newYork: true,
      london: true,
      berlin: true,
    },
    experienceLevel: {
      entryLevel: true,
      midLevel: true,
      seniorLevel: true,
    },
  });

  useEffect(() => {
    fetchJobs();
  }, []);

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
    ];
    const numTags = Math.floor(Math.random() * 4) + 2;
    return allTags.sort(() => 0.5 - Math.random()).slice(0, numTags);
  };

  const getMockJobs = () => [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full Time",
      salaryRange: "$120,000 - $180,000",
      description:
        "We are looking for a skilled Senior Frontend Developer to join our dynamic team. You'll be responsible for building cutting-edge web applications using modern technologies and best practices.",
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
    {
      id: 8,
      title: "Senior Backend Engineer",
      company: "ServerSide Corp",
      location: "Berlin, Germany",
      type: "Contract",
      salaryRange: "€95,000 - €145,000",
      description:
        "Design and implement robust backend systems and APIs. Work with microservices architecture, databases, and distributed systems at scale.",
      datePosted: "2024-09-13",
      applicants: 72,
    },
    {
      id: 9,
      title: "Frontend Developer",
      company: "WebCorp",
      location: "London, UK",
      type: "Part Time",
      salaryRange: "£45k - £65k",
      description:
        "Build responsive web applications using React and modern CSS frameworks. Work in an agile environment with a focus on user experience.",
      datePosted: "2024-09-12",
      applicants: 28,
    },
    {
      id: 10,
      title: "Lead Software Engineer",
      company: "TechGiant",
      location: "San Francisco, CA",
      type: "Remote",
      salaryRange: "$180,000 - $250,000",
      description:
        "Lead a team of engineers to build scalable software solutions. Mentor junior developers and drive technical decision making.",
      datePosted: "2024-09-11",
      applicants: 112,
    },
  ];

  const getRandomJobTitle = () => {
    const titles = [
      "Senior Frontend Developer",
      "Product Manager",
      "UX Designer",
      "Data Scientist",
      "DevOps Engineer",
      "Full Stack Developer",
      "Mobile App Developer",
      "Backend Engineer",
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomCompany = () => {
    const companies = [
      "TechCorp Inc.",
      "InnovateLabs",
      "DesignStudio Pro",
      "DataFlow Analytics",
      "CloudTech Solutions",
      "StartupXYZ",
      "AppMakers Inc.",
      "ServerSide Corp",
    ];
    return companies[Math.floor(Math.random() * companies.length)];
  };

  const getRandomLocation = () => {
    const locations = [
      "San Francisco, CA",
      "New York, NY",
      "Remote",
      "London, UK",
      "Berlin, Germany",
      "Austin, TX",
      "Seattle, WA",
      "Chicago, IL",
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const getRandomJobType = () => {
    const types = ["Full Time", "Part Time", "Contract", "Remote"];
    return types[Math.floor(Math.random() * types.length)];
  };

  const getRandomDescription = () => {
    const descriptions = [
      "We are looking for a skilled developer to join our dynamic team. You'll be responsible for building cutting-edge applications using modern technologies.",
      "Join our team to drive innovation and create exceptional user experiences. Work with cutting-edge technologies in a collaborative environment.",
      "Contribute to building scalable solutions that impact millions of users. Work with a talented team in a fast-paced startup environment.",
      "Help us build the future of technology. Work on challenging problems with the latest tools and frameworks.",
      "Be part of a team that values creativity, innovation, and technical excellence. Build products that make a difference.",
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);

      let data = [];
      const apiEndpoints = [
        "https://jsonfakery.com/jobs",
        "https://jsonfakery.com/job-posts",
        "https://jsonplaceholder.typicode.com/posts",
      ];

      for (const endpoint of apiEndpoints) {
        try {
          const response = await fetch(endpoint);
          if (response.ok) {
            data = await response.json();
            break;
          }
        } catch (err) {
          continue;
        }
      }

      if (!data || data.length === 0) {
        data = getMockJobs();
      }

      const enhancedJobs = data.slice(0, 20).map((item, index) => ({
        id: item.id || index + 1,
        title: item.title || getRandomJobTitle(),
        company: item.company || getRandomCompany(),
        location: item.location || getRandomLocation(),
        type: item.type || getRandomJobType(),
        description: item.body || item.description || getRandomDescription(),
        datePosted: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0],
        applicants: Math.floor(Math.random() * 200),
        salaryRange: `$${Math.floor(Math.random() * 50 + 70)}k - $${Math.floor(
          Math.random() * 50 + 120
        )}k`,
        tags: generateJobTags(),
        requirements: [
          `${Math.floor(
            Math.random() * 5 + 2
          )}+ years of experience with React and modern JavaScript`,
          "Strong knowledge of TypeScript and Next.js",
          "Experience with state management (Redux, Zustand)",
          "Familiarity with testing frameworks (Jest, Cypress)",
          "Understanding of web performance optimization",
          "Excellent problem-solving and communication skills",
        ],
        benefits: [
          "Competitive salary and equity package",
          "Health, dental, and vision insurance",
          "Flexible work arrangements",
          "Professional development budget",
          "Unlimited PTO policy",
        ],
      }));

      setJobs(enhancedJobs);
      setFilteredJobs(enhancedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      const mockJobs = getMockJobs().map((job, index) => ({
        ...job,
        id: index + 1,
        tags: generateJobTags(),
        requirements: [
          `${Math.floor(Math.random() * 5 + 2)}+ years of experience`,
          "Strong problem-solving skills",
          "Excellent communication abilities",
          "Team collaboration experience",
        ],
        benefits: [
          "Competitive salary and equity package",
          "Health, dental, and vision insurance",
          "Flexible work arrangements",
          "Professional development budget",
        ],
      }));
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const activeJobTypes = Object.entries(filters.jobType)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (activeJobTypes.length > 0 && activeJobTypes.length < 4) {
      filtered = filtered.filter((job) => {
        const jobType = job.type?.toLowerCase().replace(/\s+/g, "");
        return activeJobTypes.some((type) => {
          const filterType = type
            .toLowerCase()
            .replace(/([A-Z])/g, "")
            .replace(/\s+/g, "");
          return jobType.includes(filterType) || filterType.includes(jobType);
        });
      });
    }

    const activeLocations = Object.entries(filters.location)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (activeLocations.length > 0 && activeLocations.length < 4) {
      filtered = filtered.filter((job) => {
        const jobLocation = job.location?.toLowerCase();
        return activeLocations.some((location) => {
          const locationMap = {
            sanfrancisco: "san francisco",
            newyork: "new york",
            london: "london",
            berlin: "berlin",
          };

          const mappedLocation =
            locationMap[location.toLowerCase()] || location;
          return jobLocation?.includes(mappedLocation);
        });
      });
    }

    const activeExperienceLevels = Object.entries(filters.experienceLevel)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (
      activeExperienceLevels.length > 0 &&
      activeExperienceLevels.length < 3
    ) {
      filtered = filtered.filter((job) => {
        const jobTitle = job.title?.toLowerCase();
        return activeExperienceLevels.some((level) => {
          switch (level) {
            case "entryLevel":
              return (
                !jobTitle?.includes("senior") &&
                !jobTitle?.includes("lead") &&
                !jobTitle?.includes("principal")
              );
            case "midLevel":
              return (
                !jobTitle?.includes("senior") &&
                !jobTitle?.includes("junior") &&
                !jobTitle?.includes("entry")
              );
            case "seniorLevel":
              return (
                jobTitle?.includes("senior") ||
                jobTitle?.includes("lead") ||
                jobTitle?.includes("principal")
              );
            default:
              return true;
          }
        });
      });
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, filters]);

  const handleApplyJob = (jobId) => {
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

    alert("Application submitted successfully!");
  };

  const handleFilterChange = (category, filter) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [filter]: !prev[category][filter],
      },
    }));
  };

  const handleAddJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Math.max(...jobs.map((j) => j.id || 0)) + 1,
      datePosted: new Date().toISOString().split("T")[0],
      applicants: 0,
      tags: generateJobTags(),
    };
    setJobs([newJob, ...jobs]);
    setShowJobForm(false);
  };

  const handleUpdateJob = (jobData) => {
    setJobs(
      jobs.map((job) =>
        job.id === editingJob.id ? { ...job, ...jobData } : job
      )
    );
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
    setSelectedJob(null);
  };

  const JobForm = ({ job, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      title: job?.title || "",
      company: job?.company || "",
      location: job?.location || "",
      type: job?.type || "Full Time",
      salaryRange: job?.salaryRange || "",
      description: job?.description || "",
    });

    const handleSubmit = () => {
      onSubmit(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">
              {job ? "Edit Job" : "Add New Job"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Salary Range
                </label>
                <input
                  type="text"
                  value={formData.salaryRange}
                  onChange={(e) =>
                    setFormData({ ...formData, salaryRange: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., $120,000 - $180,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                >
                  {job ? "Update Job" : "Add Job"}
                </button>
                <button
                  onClick={onCancel}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600" style={{ backgroundColor: "#4472C4" }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-12">
              <h1 className="text-2xl font-bold text-white">JobHub</h1>
              <nav className="hidden md:flex space-x-8">
                <a
                  href="https://jobs.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 font-medium"
                >
                  Jobs
                </a>
                <a
                  href="https://www.glassdoor.com/Reviews/index.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 font-medium"
                >
                  Companies
                </a>
                <a
                  href="https://www.glassdoor.com/Salaries/index.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 font-medium"
                >
                  Salary
                </a>
                <a
                  href="https://www.indeed.com/career-advice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 font-medium"
                >
                  Resources
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-blue-700 text-white border border-blue-400 rounded px-3 py-2 text-sm"
              >
                <option value="job-seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
              <button className="border-2 border-white text-white px-6 py-2 rounded font-medium hover:bg-white hover:text-blue-600 transition-colors">
                Sign In
              </button>
              {userRole === "recruiter" && (
                <button
                  onClick={() => setShowJobForm(true)}
                  className="bg-white text-blue-600 px-6 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
                >
                  Post a Job
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Job Type</h3>
                <div className="space-y-2">
                  {Object.entries(filters.jobType).map(([key, value]) => {
                    const jobCount = jobs.filter((job) => {
                      const jobType = job.type
                        ?.toLowerCase()
                        .replace(/\s+/g, "");
                      const filterType = key
                        .toLowerCase()
                        .replace(/([A-Z])/g, "")
                        .replace(/\s+/g, "");
                      return (
                        jobType.includes(filterType) ||
                        filterType.includes(jobType)
                      );
                    }).length;

                    return (
                      <label
                        key={key}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleFilterChange("jobType", key)}
                          className="mr-2 text-blue-600"
                        />
                        <span className="text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                          <span className="text-gray-400 ml-1">
                            ({jobCount})
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Location</h3>
                <div className="space-y-2">
                  {Object.entries(filters.location).map(([key, value]) => {
                    const locationMap = {
                      sanFrancisco: "san francisco",
                      newYork: "new york",
                      london: "london",
                      berlin: "berlin",
                    };

                    const jobCount = jobs.filter((job) => {
                      const jobLocation = job.location?.toLowerCase();
                      const mappedLocation =
                        locationMap[key] || key.toLowerCase();
                      return jobLocation?.includes(mappedLocation);
                    }).length;

                    return (
                      <label
                        key={key}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleFilterChange("location", key)}
                          className="mr-2 text-blue-600"
                        />
                        <span className="text-gray-700">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          <span className="text-gray-400 ml-1">
                            ({jobCount})
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Experience Level
                </h3>
                <div className="space-y-2">
                  {Object.entries(filters.experienceLevel).map(
                    ([key, value]) => {
                      const jobCount = jobs.filter((job) => {
                        const jobTitle = job.title?.toLowerCase();
                        switch (key) {
                          case "entryLevel":
                            return (
                              !jobTitle?.includes("senior") &&
                              !jobTitle?.includes("lead") &&
                              !jobTitle?.includes("principal") &&
                              (jobTitle?.includes("junior") ||
                                jobTitle?.includes("entry") ||
                                (!jobTitle?.includes("senior") &&
                                  !jobTitle?.includes("lead")))
                            );
                          case "midLevel":
                            return (
                              !jobTitle?.includes("senior") &&
                              !jobTitle?.includes("junior") &&
                              !jobTitle?.includes("entry") &&
                              !jobTitle?.includes("lead") &&
                              !jobTitle?.includes("principal")
                            );
                          case "seniorLevel":
                            return (
                              jobTitle?.includes("senior") ||
                              jobTitle?.includes("lead") ||
                              jobTitle?.includes("principal")
                            );
                          default:
                            return true;
                        }
                      }).length;

                      return (
                        <label
                          key={key}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() =>
                              handleFilterChange("experienceLevel", key)
                            }
                            className="mr-2 text-blue-600"
                          />
                          <span className="text-gray-700">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            <span className="text-gray-400 ml-1">
                              ({jobCount})
                            </span>
                          </span>
                        </label>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Latest Job Openings
                  </h2>
                  <p className="text-gray-600">
                    {filteredJobs.length} jobs found
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3
                        className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer"
                        onClick={() => setSelectedJob(job)}
                      >
                        {job.title}
                      </h3>

                      <div className="flex items-center text-blue-600 mb-2">
                        <Building2 className="w-4 h-4 mr-1" />
                        <span className="font-medium">{job.company}</span>
                      </div>

                      <div className="flex items-center text-gray-600 mb-3 space-x-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{job.type}</span>
                        </div>
                        {job.salaryRange && (
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>{job.salaryRange}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags?.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">
                            {job.applicants} applicants
                          </span>
                          {userRole === "recruiter" && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setEditingJob(job);
                                  setShowJobForm(true);
                                }}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedJob(job)}
                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                          >
                            View Details
                          </button>
                          {userRole === "job-seeker" &&
                            !applications.some(
                              (app) => app.jobId === job.id
                            ) && (
                              <button
                                onClick={() => handleApplyJob(job.id)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Apply Now
                              </button>
                            )}
                          {userRole === "job-seeker" &&
                            applications.some(
                              (app) => app.jobId === job.id
                            ) && (
                              <span className="px-4 py-2 bg-green-100 text-green-700 rounded">
                                Applied
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedJob && (
            <div className="w-96 flex-shrink-0">
              <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedJob.title}
                  </h2>
                  <div className="text-blue-600 font-medium mb-2">
                    {selectedJob.company}
                  </div>
                  <div className="text-gray-600 mb-4">
                    {selectedJob.salaryRange}
                  </div>
                  <div className="text-sm text-gray-500">per year</div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Job Description
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {selectedJob.description}
                  </p>

                  <p className="text-gray-600 text-sm">
                    We're looking for a skilled {selectedJob.title} to join our
                    dynamic team. You'll be responsible for building
                    cutting-edge web applications using modern technologies and
                    best practices.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements?.slice(0, 4).map((req, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {selectedJob.benefits?.slice(0, 5).map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-green-600 mr-2">•</span>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {userRole === "job-seeker" && (
                  <button
                    onClick={() => {
                      if (
                        !applications.some(
                          (app) => app.jobId === selectedJob.id
                        )
                      ) {
                        handleApplyJob(selectedJob.id);
                      }
                    }}
                    className={`w-full py-3 rounded-lg font-medium ${
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
                      : "Apply for this Position"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

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

export default JobPortalApp;
