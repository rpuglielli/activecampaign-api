export type Deal = {
  deal: {
    hash: string;
    owner: string;
    contact: string;
    organization: string;
    group: string;
    stage: string;
    title: string;
    description: string;
    percent: string;
    cdate: string;
    mdate: string;
    nextdate: string;
    nexttaskid: string;
    value: string;
    currency: string;
    winProbability: string;
    winProbabilityMdate: string;
    status: string;
    activitycount: string;
    nextdealid: string;
    edate: string;
    id: string;
    isDisabled: string;
    nextTask: string;
    account: string;
    customerAccount: string;
  };
};

export type Task = {
  id: string;
  relid: number;
  reltype: string;
  dealTasktype: string;
  user: string;
  assignee: string;
  assigned_date: string;
  automation: string;
  cdate: string;
  duedate: string;
  edate: string;
  duration: string;
  status: string;
  title: string;
  note: string;
  donedate: string;
  doneAutomation: string;
  triggerAutomationOnCreate: string;
  udate: string;
  outcomeId: string;
  outcomeInfo: string;
  updated_by: string;
  done_by: string;
  created_utc_timestamp: string;
  updated_utc_timestamp: string;
  done_utc_timestamp: string;
  owner: any;
};

export type Note = {
  id: number;
  user: string;
  owner: any;
  relid: string;
  reltype: string;
  userid: string;
  is_draft: string;
  cdate: string;
  mdate: string;
  note: string;
};

export type Notes = {
  notes: Note[];
};

export type Owner = {
  type: string;
  id: string;
};

export type DealTasks = {
  dealTasks: Task[];
};

export type DealMainContact = {
  contact: {
    id: string;
  };
};

export type DealNotes = {
  notes: Note[];
};

export type SecondaryContact = {
  contact: string;
  isDisabled: boolean;
};

export type DealSecondaryContacts = {
  contactDeals: SecondaryContact[];
};

export type ContactDeal = {
  deal: number;
  contact: number;
};

export type CustomFieldValue = {
  dealId: number;
  customFieldId: number;
  fieldValue: Record<string, unknown>;
};

export type DealCustomFieldValues = {
  dealCustomFieldData: CustomFieldValue[];
};
