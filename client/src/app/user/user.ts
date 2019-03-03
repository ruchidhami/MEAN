export class User {
  id: string;
  fullName: string;
  gender: string;
  designation: string;
  profile: any;
  status: boolean;
  experience: any;


  constructor(props: any) {
    this.id = props._id
    this.fullName = props.fullName;
    this.gender = props.gender;
    this.designation = props.designation;
    this.profile = props.profile;
    this.status = props.status;
    this.experience = props.experience;
  }
}
