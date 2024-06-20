import React, { useState } from 'react';
import DarkModeToggle from '~/components/DarkModeToggle';
import ToggleButton from '../Utils/ToggleButton';
import Button from '@kit/ui/Button';
import { FatArrow, FatArrowWhite, NoteInfoIcon } from '../Icons';
import {
  ModalInputDateAndTime,
  ModalInputTimeZone,
  ModalOptionSelector,
  ModalSelectInput,
} from '../Inputs/Inputs';

function ScheduleSettingModal(props: any) {
  const { active, setActive, children } = props;
  const [isToggled, setIsToggled] = useState(false);
  const [whenToPost, setWhenToPost] = useState('');
  const [customDay, setCustomDay] = useState('');

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };
  return (
    <div className="output-boxshadow p-6 rounded-md bg-white w-[684px] max-w-[90%] z-50 max-h-[95vh]">
      <div className="mb-6">
        <div className="font-semibold text-base leading-6 text-[#071019]">
          Schedule Settings
        </div>
        <p className="text-[#5B606A] text-xs leading-[18px]">
          Edit your schedule setings
        </p>
      </div>
      <div className="flex flex-col gap-6 max-h-[60vh] md:max-h-[70vh] overflow-auto  overflow-y-scroll ">
        <ModalOptionSelector
          label="When do you want to post?"
          active={whenToPost}
          setActive={setWhenToPost}
          options={[
            ,
            { label: 'Everyday', value: 'Everyday' },
            {
              label: 'Weekdays (Monday to Friday)',
              value: 'Weekdays (Monday to Friday)',
            },
            { label: 'Custom', value: 'Custom' },
          ]}
        />
        <ModalOptionSelector
          label="Customize Days"
          active={customDay}
          setActive={setCustomDay}
          options={[
            ,
            { label: 'Monday', value: 'Monday' },
            { label: 'Tuesday', value: 'Tuesday' },
            { label: 'Wednesday', value: 'Wednesday' },
            { label: 'Thursday', value: 'Thursday' },
            { label: 'Friday', value: 'Friday' },
          ]}
        />
        <ModalSelectInput
          label="Enter Daily Number of Posts"
          options={[
            ,
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
          ]}
          fitWidth
        />

        <div className="bg-[#F6F7F9B2] p-6">
          <div className="flex gap-6 flex-wrap">
          
          </div>
          <div className="flex flex-row items-center my-3">
            <div className="h-[1px] flex-1 bg-[#E0E1E3]"></div>
            <div className="text-[#5B606A] text-sm mx-2">OR</div>
            <div className="h-[1px] flex-1 bg-[#E0E1E3]"></div>
          </div>
          <div className="flex gap-6 flex-wrap">
           
          </div>
          <div className="mt-3 text-sm leading-[21px] text-[#5B606A] flex items-center  gap-1">
            <NoteInfoIcon />{' '}
            <div className="">
              Based on your selection your post timings are going to be:{' '}
              <span className="font-bold">6:00 PM</span>,{' '}
              <span className="font-bold">8:00 PM</span> and{' '}
              <span className="font-bold">10:00 PM</span>
            </div>
          </div>
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
        <Button round href="#" className="" onClick={() => setActive(false)}>
          <span className="flex items-center justify-center gap-2">
            Confirm Schedule
          </span>
        </Button>
      </div>
    </div>
  );
}

export default ScheduleSettingModal;
