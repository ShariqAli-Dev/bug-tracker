export const initialNotifications = [
  {
    message: "I was archived 01",
    archived: true,
    id: 0,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
  {
    message: "i am not archived 01",
    archived: false,
    id: 1,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
  {
    message: "I was archived 02",
    archived: true,
    id: 3,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
  {
    message: "i am not archived 02",
    archived: false,
    id: 4,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
  {
    message: "I was archived 03",
    archived: true,
    id: 5,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
  {
    message: "i am not archived 03",
    archived: false,
    id: 6,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
  {
    message: "I was archived 04",
    archived: true,
    id: 7,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
  {
    message: "i am not archived 04",
    archived: false,
    id: 8,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
  {
    message: "i am not archived 03",
    archived: false,
    id: 6,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
  {
    message: "I was archived 04",
    archived: true,
    id: 7,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
  {
    message: "i am not archived 04",
    archived: false,
    id: 8,
    date: `${new Date().toLocaleDateString("en-US")}`,
  },
];

export const initialProjects = [
  {
    id: 0,
    creatorId: 0,
    name: "Bug Tracker",
    description: "Project management tool to track project issues, bugs, et c",
    assignedPersonale: [
      {
        id: 0,
        name: "shariq",
        email: "shariqemail@email.com",
        role: "DEMO_ADMIN",
      },
    ],
    tickets: [
      {
        id: 0,
        title: "Fix the colorscheme",
        submitter: "DEMO_ADMIN",
        developer: "shariq",
        status: "closed",
        created: "ur mom",
      },
    ],
    contributors: ["Shariq Ali"],
  },
  {
    id: 1,
    creatorId: 0,
    name: "Bug Tracker",
    description: "Project management tool to track project issues, bugs, et c",
    assignedPersonale: [
      {
        id: 0,
        name: "shariq",
        email: "shariqemail@email.com",
        role: "DEMO_ADMIN",
      },
    ],
    tickets: [
      {
        id: 0,
        title: "Fix the colorscheme",
        submitter: "DEMO_ADMIN",
        developer: "shariq",
        status: "closed",
        created: "ur mom",
      },
    ],
    contributors: ["Shariq Ali"],
  },
  {
    id: 2,
    creatorId: 0,
    name: "Bug Tracker",
    description: "Project management tool to track project issues, bugs, et c",
    assignedPersonale: [
      {
        id: 0,
        name: "shariq",
        email: "shariqemail@email.com",
        role: "DEMO_ADMIN",
      },
    ],
    tickets: [
      {
        id: 0,
        title: "Fix the colorscheme",
        submitter: "DEMO_ADMIN",
        developer: "shariq",
        status: "closed",
        created: "ur mom",
      },
    ],
    contributors: ["Shariq Ali"],
  },
];

export const initialUsers = [
  {
    id: 0,
    username: "DEMO_USER",
    email: "DEMO_USER@email.com",
    role: "DEMO_ADMIN",
    projectId: 0,
  },
  {
    id: 1,
    username: "DEMO_USER",
    email: "DEMO_USER@email.com",
    role: "DEMO_ADMIN",
    projectId: 0,
  },
  {
    id: 2,
    username: "DEMO_USER",
    email: "DEMO_USER@email.com",
    role: "DEMO_ADMIN",
    projectId: 0,
  },
  {
    id: 3,
    username: "DEMO_USER",
    email: "DEMO_USER@email.com",
    role: "DEMO_ADMIN",
    projectId: 0,
  },
];

export const initialTickets = [
  {
    id: 0,
    details: {
      title: "great work",
      description: "keep on plugging in the code, you are getting there",
      assignedDeveloper: 1,
      submitted: "Demo Submitter",
      project: "Demo Project 1",
      priority: "Medium",
      status: "open",
      type: "bug/error/",
      created: "11/9/2019",
      updated: "",
    },
    comments: [
      { commenter: "Shariq", message: "ooga booga", created: "11/9/2019" },
    ],
    history: [
      {
        property: "assignedToUserId",
        oldValue: "name",
        newValue: "name",
        dateChanged: "11/9/2019",
      },
    ],
    attachments: [
      {
        file: "fileNAme",
        uploader: "userName",
        notes: "description",
        created: "11/9/2019",
      },
    ],
  },
];
