export class CreateProjectDto {
  title: string;
  description?: string;
  type?: string;
  language?: string;
  nationalityReq?: string;
  autoAccept?: boolean;
  reward?: string;
  applicantsReq?: number;
  deadline?: Date;
  generateCodes?: boolean;
  userId: string;
  adminCommission?: string;
}
