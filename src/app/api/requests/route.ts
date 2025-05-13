import { type NextRequest, NextResponse } from "next/server";

// Mock database for demonstration purposes
// In a real application, you would connect to a real database

const mockRequests = [
  {
    id: "1",
    portfolioMember: "Ismaili Professional Network (IPN)",
    submittedBy: "Katy",
    programName: "Tee Time & Talk",
    email: "amber9909@gmail.com",
    programDate: "2023-06-01",
    status: "Pending",
    createdAt: "2023-05-25T10:30:00Z",
  },
  {
    id: "2",
    portfolioMember: "AKHB",
    submittedBy: "Corpus Christi, San Antonio",
    programName: "International Nurses Day",
    email: "foorucha1@yahoo.com",
    programDate: "2023-05-12",
    status: "Pending",
    createdAt: "2023-05-01T14:20:00Z",
  },
  {
    id: "3",
    portfolioMember: "Local Announcements",
    submittedBy: "Corpus Christi, San Antonio",
    programName: "Translations",
    email: "icsw@usjj.org",
    programDate: "2023-05-09",
    status: "Approved",
    createdAt: "2023-04-28T09:15:00Z",
  },
  {
    id: "4",
    portfolioMember: "Program",
    submittedBy: "Beaumont",
    programName: "Rites & Ceremonies COL @ BMT",
    email: "icsw@usjj.org",
    programDate: "2023-05-09",
    status: "Approved",
    createdAt: "2023-04-25T11:45:00Z",
  },
  {
    id: "5",
    portfolioMember: "Mental Health",
    submittedBy: "Corpus Christi, San Antonio",
    programName: "Mental Health Awareness",
    email: "zainabkhuwaja@gmail.com",
    programDate: "2023-05-08",
    status: "Approved",
    createdAt: "2023-04-20T16:30:00Z",
  },
  {
    id: "6",
    portfolioMember: "AKHB",
    submittedBy: "Austin",
    programName: "Health Fair",
    email: "health@example.com",
    programDate: "2023-07-15",
    status: "Pending",
    createdAt: "2023-06-10T08:00:00Z",
  },
  {
    id: "7",
    portfolioMember: "Program",
    submittedBy: "Sugar Land",
    programName: "Youth Development Workshop",
    email: "youth@example.com",
    programDate: "2023-07-22",
    status: "Approved",
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "8",
    portfolioMember: "Local Announcements",
    submittedBy: "Headquarters",
    programName: "Community Meeting",
    email: "community@example.com",
    programDate: "2023-08-05",
    status: "Pending",
    createdAt: "2023-07-01T14:45:00Z",
  },
  {
    id: "9",
    portfolioMember: "Mental Health",
    submittedBy: "Spring",
    programName: "Stress Management Workshop",
    email: "mentalhealth@example.com",
    programDate: "2023-08-12",
    status: "Rejected",
    createdAt: "2023-07-05T09:15:00Z",
  },
  {
    id: "10",
    portfolioMember: "Ismaili Professional Network (IPN)",
    submittedBy: "Austin Downtown",
    programName: "Networking Event",
    email: "network@example.com",
    programDate: "2023-08-19",
    status: "Approved",
    createdAt: "2023-07-10T11:00:00Z",
  },
  {
    id: "11",
    portfolioMember: "AKHB",
    submittedBy: "Katy",
    programName: "Diabetes Awareness",
    email: "diabetes@example.com",
    programDate: "2023-09-02",
    status: "Pending",
    createdAt: "2023-08-01T13:30:00Z",
  },
  {
    id: "12",
    portfolioMember: "Program",
    submittedBy: "Principal",
    programName: "Educational Seminar",
    email: "education@example.com",
    programDate: "2023-09-09",
    status: "Approved",
    createdAt: "2023-08-05T15:45:00Z",
  },
  {
    id: "13",
    portfolioMember: "Local Announcements",
    submittedBy: "Harvest Green",
    programName: "Community Picnic",
    email: "picnic@example.com",
    programDate: "2023-09-16",
    status: "Approved",
    createdAt: "2023-08-10T10:00:00Z",
  },
  {
    id: "14",
    portfolioMember: "Mental Health",
    submittedBy: "College Station",
    programName: "Mindfulness Workshop",
    email: "mindfulness@example.com",
    programDate: "2023-09-23",
    status: "Pending",
    createdAt: "2023-08-15T12:15:00Z",
  },
  {
    id: "15",
    portfolioMember: "Ismaili Professional Network (IPN)",
    submittedBy: "Austin South",
    programName: "Career Fair",
    email: "career@example.com",
    programDate: "2023-09-30",
    status: "Rejected",
    createdAt: "2023-08-20T14:30:00Z",
  },
];

export async function GET(request: NextRequest) {
  try {
    // Get query parameters

    console.log("Request URL:", request.nextUrl.href);

    const searchParams = request.nextUrl.searchParams;

    // Extract filter parameters
    const portfolioMember = searchParams.get("portfolioMember");
    const submittedByParams = searchParams.getAll("submittedBy");
    const programName = searchParams.get("programName");
    const email = searchParams.get("email");
    const programDateFrom = searchParams.get("programDateFrom");
    const programDateTo = searchParams.get("programDateTo");
    const status = searchParams.get("status");
    const dateAdded = searchParams.get("dateAdded");

    // Extract pagination parameters
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    // Apply filters
    let filteredRequests = [...mockRequests];

    // Filter by portfolio member
    if (portfolioMember && portfolioMember !== "all") {
      filteredRequests = filteredRequests.filter((request) =>
        request.portfolioMember
          .toLowerCase()
          .includes(portfolioMember.toLowerCase())
      );
    }

    // Filter by submitted by (Jamatkhanas)
    if (submittedByParams.length > 0) {
      filteredRequests = filteredRequests.filter((request) =>
        submittedByParams.some((jk) => request.submittedBy.includes(jk))
      );
    }

    // Filter by program name
    if (programName) {
      filteredRequests = filteredRequests.filter((request) =>
        request.programName.toLowerCase().includes(programName.toLowerCase())
      );
    }

    // Filter by email
    if (email) {
      filteredRequests = filteredRequests.filter((request) =>
        request.email.toLowerCase().includes(email.toLowerCase())
      );
    }

    // Filter by program date range
    if (programDateFrom) {
      filteredRequests = filteredRequests.filter(
        (request) => new Date(request.programDate) >= new Date(programDateFrom)
      );
    }

    if (programDateTo) {
      filteredRequests = filteredRequests.filter(
        (request) => new Date(request.programDate) <= new Date(programDateTo)
      );
    }

    // Filter by status
    if (status && status !== "all") {
      filteredRequests = filteredRequests.filter(
        (request) => request.status === status
      );
    }

    // Filter by date added
    if (dateAdded) {
      filteredRequests = filteredRequests.filter((request) => {
        const requestDate = new Date(request.createdAt || "");
        const filterDate = new Date(dateAdded);

        return (
          requestDate.getFullYear() === filterDate.getFullYear() &&
          requestDate.getMonth() === filterDate.getMonth() &&
          requestDate.getDate() === filterDate.getDate()
        );
      });
    }

    // Calculate pagination
    const totalItems = filteredRequests.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Get paginated results
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

    // Add a small delay to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return response
    return NextResponse.json({
      requests: paginatedRequests,
      pagination: {
        currentPage: page,
        totalPages,
        itemsPerPage: limit,
        totalItems,
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
