import { setHours, setMinutes } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'; 

function Inputs() {
  return <div></div>;
}

export default Inputs;

interface ModalInputDateAndTimeProps {
  name: string;
  label: string;
  startDate: Date;
  setStartDate: (date: Date|null) => void;
  disabled: boolean;
}



export const TextInput = (props: any) => {
  const { name, label, ...rest } = props;
  return (
    <>
      <label htmlFor="name">
        <div className="input-label mb-[6px]">{label}</div>
        <input
          type="text"
          className="input-effects rounded-[6px] border border-[#E0E1E3] w-[100%] py-2 px-3  resize-none text-sm leading-[21px]  placeholder:text-[#5B606A]"
          name={name}
          {...rest}
        />
      </label>
    </>
  );
};

export const TextAreaInput = (props: any) => {
  const { name, label, ...rest } = props;
  return (
    <>
      <label htmlFor="name">
        <div className="input-label mb-[6px]">{label}</div>
        <textarea
          name={name}
          className="input-effects rounded-[6px] border border-[#E0E1E3] w-[100%] py-2 px-3 h-20 resize-none text-sm leading-[21px]  placeholder:text-[#5B606A]"
          placeholder="Start by writing your idea"
          {...rest}
        />
      </label>
    </>
  );
};

export const ModalInputTimeZone = (props: any) => {
  const { name, label, options, disabled, ...rest } = props;
  console.log(options);
  return (
    <>
      <label htmlFor="name">
        <div
          className={` mb-[6px] ${disabled ? 'input-label-disabled' : 'input-label'}`}
        >
          {label}
        </div>
        <select
          name={name}
          className={`input-effects rounded-[6px] border border-[#E0E1E3] w-[100%] py-[6px] px-2  text-sm   placeholder:text-[#5B606A] text-[#5B606A] h-[33px] ${disabled ? 'hover:border-[#E0E1E3]' : ''}`}
          {...rest}
          disabled={disabled}
        >
          {options?.map((e: any, i: number) => {
            return (
              <option value={e?.value} key={i}>
                {e?.label}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
};




export const ModalInputDateAndTime: React.FC<ModalInputDateAndTimeProps> = ({
  name,
  label,
  startDate,
  setStartDate,
  disabled
}) => {
  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    return currentDate.getTime() < time.getTime();
  };

  return (
    <label htmlFor={name}>
      <div className={`mb-6 font-semibold ${disabled ? 'input-label-disabled' : 'input-label'}`}>
        {label}
      </div>
      <DatePicker
        selected={startDate}
        onChange={(e) => setStartDate(e)}
        showTimeSelect
        timeIntervals={10}
        filterTime={filterPassedTime}
        dateFormat="MMMM d, yyyy h:mm aa"
        name={name}
        disabled={disabled}
        placeholderText='Set date and time'
        
      />
    </label>
  );
};





export const ModalOptionSelector = (props: any) => {
  const { name, label, options, active, setActive, disabled, type, ...rest } =
    props;
  return (
    <>
      <label htmlFor="name">
        <div className=" mb-[6px] text-sm leading-[22px] text-[#071019] font-semibold ">
          {label}
        </div>
        <div className="flex flex-wrap gap-[6px]">
          {options &&
            options?.map((e: any, i: any) => {
              return (
                <button
                  type="button"
                  key={i}
                  className={`text-sm leading-[21px] text-[#5B606A] py-[6px] px-4 rounded-[8px] border  hover:bg-[#007FFF0D] ${active === e.value ? 'border-[#007FFF] bg-[#007FFF0D]' : 'border-[#E0E1E3]'}`}
                  onClick={() => {
                    setActive(e.value);
                  }}
                >
                  {e.value}
                </button>
              );
            })}
        </div>
      </label>
    </>
  );
};

export const ModalSelectInput = (props: any) => {
  const {
    name,
    label,
    options,
    active,
    setActive,
    disabled,
    fitWidth,
    type,
    ...rest
  } = props;
  return (
    <>
      <label htmlFor="name">
        <div className=" mb-[6px] text-sm leading-[22px] text-[#071019] font-semibold ">
          {label}
        </div>
        <select
          name={name}
          className={`input-effects rounded-[6px] border border-[#E0E1E3] w-[100%] py-[6px] px-2  text-sm   placeholder:text-[#5B606A] text-[#5B606A] h-[33px] ${disabled ? 'hover:border-[#E0E1E3]' : ''} ${fitWidth ? 'w-fit' : ''}`}
          {...rest}
          disabled={disabled}
        >
          {options?.map((e: any, i: number) => {
            return (
              <option value={e?.value} key={i}>
                {e?.label}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
};






