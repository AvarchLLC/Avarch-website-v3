export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  focus: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  /** Links to a fuller profile on this site. */
  profile?: string;
};

// Core team, sourced from the EIPsInsight team page.
export const team: TeamMember[] = [
  {
    name: "Pooja Ranjan",
    role: "Founder",
    photo: "/img/team/pooja.jpg",
    focus: "Sets product direction and ecosystem strategy across Avarch's publications and tools.",
    github: "poojaranjan",
    twitter: "poojaranjan19",
    linkedin: "https://www.linkedin.com/in/pooja-r-072899114/",
    profile: "/founder",
  },
  {
    name: "Yash Kamal Chaturvedi",
    role: "Operations Lead",
    photo: "/img/team/yash.jpg",
    focus: "Coordinates delivery, contributor workflows and regular updates across the platforms.",
    linkedin: "https://www.linkedin.com/in/yash-kamal-chaturvedi/",
  },
  {
    name: "Dhanush Naik",
    role: "Full Stack Engineer",
    photo: "/img/team/dhanush.png",
    focus: "Builds core systems across proposal indexing, interfaces and APIs.",
    github: "dhanushlnaik",
    linkedin: "https://www.linkedin.com/in/dhanushlnaik/",
  },
  {
    name: "Subhrajeet Bhattacharjee",
    role: "Full Stack Intern",
    photo: "/img/team/subhrajeet.jpg",
    focus: "Works across frontend, backend and product improvements.",
    github: "SubhrajeetBhattacharjee",
    linkedin: "https://www.linkedin.com/in/subhrajeet-bhattacharjee/",
  },
  {
    name: "Rajdeep Chakraborty",
    role: "Full Stack Intern",
    photo: "/img/team/rajdeep.png",
    focus: "Works across frontend, backend and product improvements.",
    linkedin: "https://www.linkedin.com/in/rajdeepchakraborty69/",
  },
];

export const hiringEmail = "dev@avarch.org";
