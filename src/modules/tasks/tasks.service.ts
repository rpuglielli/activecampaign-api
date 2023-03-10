import { Injectable } from '@nestjs/common';

import ActiveCampaign from '@/lib/ActiveCampaignApi';

@Injectable()
export class TasksService {
  async getTask(taskId: number) {
    return ActiveCampaign.get(`/dealTasks/${taskId}`);
  }

  async createTask(dealId: number, task) {
    const newTask = {
      dealTask: {
        title: task.title,
        ownerType: task.ownerType,
        relid: task.relid,
        status: task.status,
        note: task.note,
        duedate: task.duedate,
        edate: task.edate,
        dealTasktype: task.dealTasktype,
        assignee: task.assignee,
      },
    };
    return ActiveCampaign.post('/dealTasks', newTask);
  }
}
