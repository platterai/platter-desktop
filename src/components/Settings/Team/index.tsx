import { members } from "../../../constants/members";
import Member from "./Member";

type TeamProps = {};

const Team = ({}: TeamProps) => (
  <>
    <div className='flex items-center justify-between mb-8 gap-4'>
      <div className='h5'>Members</div>
      <button className='btn-blue'>Invite</button>
    </div>
    <div className='py-3 base2 text-n-4'>42 members</div>
    <div className='mb-6'>
      {members.map((member, index) => (
        <Member
          item={member}
          key={member.id}
          style={{ zIndex: members.length - index }}
        />
      ))}
    </div>
  </>
);

export default Team;
