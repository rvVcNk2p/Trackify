export interface NavLink {
  name: string
  label: string
  icon: string | null
  params: {[key: string]: string} | null
}
export interface NavGroup {
  main: Array<Partial<NavLink>>,
  auth: Array<Partial<NavLink>>
}

export interface ProjectMember {
  _id: string | null,
  name: string,
  avatar: string | null,
  email: string | null,
}

export interface IssueTimeStamp {
  assignee: ProjectMember,
  at: Date,
}

export interface SprintOption {
  id: string,
  name: string,
  from: string,
  to: string,
}

export interface Project {
  _id: string | null,
  imgUrl: string | null,
  name: string | null,
  owner: string | null,
  prefix: string | null,
  availableSprints: Array<SprintOption>,
  description: string | null,
  members: Array<ProjectMember> | null,
}

export interface Issue {
  _id: string,
  ticketNumber: number,
  boardId: string,
  assignee: ProjectMember | null,
  projectId: string,
  title: string | null,
  description: string | null,
  category: string | null,
  priority: string | null,
  type: string | null,
  state: string | null,
  created: IssueTimeStamp | null,
  updated: IssueTimeStamp | null,
  estimation: string | null,
  spentTime: string | null,
  sprint: SprintOption | null,
  dueDate: string | null,
  originalEstimation: string | null
  order: number
}

export interface AvailableColumn {
  name: string | null,
  state: string | null,
  order: string | null
}
export interface ProjectBoard {
  _id: string | null,
  projectId: string | null,
  backlog: Array<Issue> | null,
  availableColumns: Array<AvailableColumn>,
  issues: Array<Issue>,
}
export interface FieldArray {
  value: string | null,
  label: string | null
}

export interface GroupedIssues {
  [key: string]: Array<Issue>
}
export interface Notification {
  id: string,
  type: string,
  message: string,
}
