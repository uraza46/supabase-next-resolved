import React, { useState } from 'react';
import DarkModeToggle from '~/components/DarkModeToggle';
import ToggleButton from '../Utils/ToggleButton';
import Button from '@kit/ui/Button';
import { FatArrow, FatArrowWhite } from '../Icons';
import { ModalInputDateAndTime, ModalInputTimeZone } from '../Inputs/Inputs';
import ReactDatePicker from 'react-datepicker';
import useCreateScheduledPost from '~/hooks/useCreateSceduled';
import moment from 'moment-timezone';

function ScheduleModal(props: any) {
  const { active, setActive, children } = props;
  const [isToggled, setIsToggled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState(moment.tz.guess());

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const [timeValue, setTimeValue] = useState(''); // State to hold the time


   // Instantiate your hook
   const createScheduledPost = useCreateScheduledPost();

   // Handler for when the user confirms the schedule
   const handleSchedule = async () => {
     // Prepare the data for the scheduled post
     const utcdate = moment.tz(scheduledDate,selectedTimeZone).utc().format();
     const scheduledPostData = {
       content: props.postContent,
       time: utcdate,
       
     };
 
     // Use the hook to create the scheduled post
     const success = await createScheduledPost(scheduledPostData);
     if (success) {
       console.log('Post scheduled successfully');
       setActive(false); // Close the modal
     } else {
       console.error('Failed to schedule the post');
     }
   };
 

  // Handler for when the time input changes
  const handleTimeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTimeValue(event.target.value);
  };
  return (
    <div className="output-boxshadow p-6 rounded-md bg-white w-[602px] max-w-[90%] z-50">
      <div className="mb-6">
        <div className="font-semibold text-base leading-6 text-[#071019]">
          Schedule Post
        </div>
        <p className="text-[#5B606A] text-xs leading-[18px]">
          Schedule your post for seamless posting
        </p>
      </div>
      <div className="grid grid-cols-7 gap-6">
        <div className="col-span-4">
          <ModalInputDateAndTime
            
            name="scheduledTime"
        label="Time"
        startDate={scheduledDate}
        setStartDate={setScheduledDate}
        disabled={isToggled}
          />
        </div>
      </div>

      
      <div className="mt-6 flex gap-8 items-center justify-end">
        <button
          type="button"
          className="text-sm text-[#5B606A]"
          onClick={() => setActive(false)}
        >
          Cancel
        </button>
        <Button round href="#" className="" onClick={handleSchedule}>
          <span className="flex items-center justify-center gap-2">
            Schedule
            <FatArrowWhite />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default ScheduleModal;
