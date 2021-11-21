export interface NavLink {
  label: string | null
  path: string | null
}

export interface ProjectMember {
  _id: string | null,
  name: string,
  avatar: string | null
}

export interface IssueTimeStamp {
  assignee: ProjectMember,
  at: Date,
}

export interface Project {
  _id: string | null,
  imgUrl: string | null,
  name: string | null,
  prefix: string | null,
  description: string | null,
  members: Array<ProjectMember> | null,
}

export interface Issue {
  _id: string | null,
  title: string | null,
  description: string | null,
  category: string | null,
  priority: string | null,
  type: string | null,
  state: string | null,
  created: IssueTimeStamp | null,
  updated: IssueTimeStamp | null,
  updatedBy: ProjectMember | null,
  estimation: string | null,
  spentTime: string | null,
  sprints: string | null,
  dueDate: Date | null,
  originalEstimation: string | null
}

export interface ProjectBoard {
  _id: string | null,
  projectId: string | null,
  backlog: Array<Issue> | null,
  availableColumns: Array<string> | null,
  issues: Array<Issue>
}

export interface AvailableColumn {
  _id: string | null,
  name: string | null,
  state: string | null,
  order: number | null
}

export interface FieldArray {
  value: string | null,
  label: string
}

export interface GroupedIssues {
  [key: string]: Array<Issue>
}
