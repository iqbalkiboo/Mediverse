import {useState} from 'react';

const useSalesStatistics = () => {
  const [open, setOpen] = useState(false);

  const handleDate = (value) => {
    if (value === true) {
      setOpen(true);
    }
    if (value === false) {
      setOpen(false);
    }
  };

  return {
    data: {
      open,
    },
    method: {
      handleDate,
    },
  };
};

export default useSalesStatistics;
