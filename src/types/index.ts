export interface IUser {
  subscription: string;
  credits: number;
  name?: string;
}

export interface IResume {
  id?: string;
  jobTitle: string;
  jobCompany: string;
  jobDescription?: string;
  status: 'pending' | 'optimized';
  optimized?: IOptimizedResume;
}

export interface IOptimizedResume {
  name: string;
  email: string;
  phone: string;
  title: string;
  summary: string;
  experience: IExperience[];
  education: IEducation[];
  skills: string[];
  keywordMatches: number;
  improvements: string[];
}

export interface IExperience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface IEducation {
  degree: string;
  school: string;
  year: string;
}

export interface IParameters {
  keywordEmphasis: number;
  briefnessFactor: number;
  technicalDetail: number;
  experienceHighlight: number;
  skillsEmphasis: number;
}

export interface IEditableContent {
  summary: string;
  skills: string[];
}

export interface IAuthContext {
  currentUser: IUser;
  getResumeById: (id: string) => IResume | null;
  updateResume: (id: string, data: Partial<IResume>) => void;
  useCredit: () => boolean;
  logout: () => void;
}
