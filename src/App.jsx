import React, { useState } from 'react';

const ChristmasDateProposal = () => {
  const [stage, setStage] = useState('initial');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [isDateSelected, setIsDateSelected] = useState(false);

  const activities = [
    'Lunch Date', 
    'Arcade', 
    'Cinema',
    'Art Exhibition'
  ];

  const handleInitialResponse = (response) => {
    if (response) {
      setStage('datePicker');
    } else {
      setStage('rejected');
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setIsDateSelected(!!e.target.value);
  };

  const handleDateConfirm = () => {
    if (isDateSelected) {
      setStage('activityPicker');
    }
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setStage('confirmed');
  };

  const renderContent = () => {
    switch (stage) {
      case 'initial':
        return (
          <div className="buttons">
            <button 
              onClick={() => handleInitialResponse(true)}
              className="button1"
            >
              Yes, I&apos;d love to!
            </button>
            <button 
              onClick={() => handleInitialResponse(false)}
            >
              No, thanks
            </button>
          </div>
        );
      
      case 'datePicker':
        return (
          <div className="datePicker">
            <input 
              id="date-select"
              type="date" 
              value={selectedDate}
              onChange={handleDateChange}
              min="2024-12-01"
              max="2024-12-31"
              className="datePicker1"
            />
            <button 
              onClick={handleDateConfirm}
              disabled={!isDateSelected}
              className={`${
                isDateSelected 
                  ? '' 
                  : ''
              }`}
            >
              Confirm Date
            </button>
          </div>
        );
      
      case 'activityPicker':
        return (
          <div className="activity-picker">
            {activities.map((activity) => (
              <button
                key={activity}
                onClick={() => handleActivitySelect(activity)}
                className="button3"
              >
                {activity}
              </button>
            ))}
          </div>
        );
      
      case 'confirmed':
        return (
          <div>
            <div>❤️</div>
            <p>
              Perfect! Our Christmas date is set for {new Date(selectedDate).toLocaleDateString()} with {selectedActivity}! 🎄
            </p>
          </div>
        );
      
      case 'rejected':
        return (
          <div>
            <p>
              Maybe next time... 💔
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mainText">
      <div>
        <h1>
          {stage === 'initial' 
            ? "Will you be my special date for Christmas?" 
            : stage === 'datePicker' 
              ? "Choose our Christmas Date" 
              : stage === 'activityPicker'
                ? "Pick Our Date Activity"
                : "Our Christmas Date"}
        </h1>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default ChristmasDateProposal;