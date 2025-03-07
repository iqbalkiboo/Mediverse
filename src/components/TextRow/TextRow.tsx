import { Rating, Typography } from '@/src/components';

interface TextRowProps {
  label: string;
  value: any;
  rating?: number;
}

const TextRow: React.FC<TextRowProps> = ({ label, value, rating = 0 }) => {
  return (
    <div className='flex'>
      <div className={'w-2/3'}>
        <Typography variant='bodySmall' color='text-[#757575]'>
          {label}
        </Typography>
      </div>
      <div className='w-full ml-3'>
        {rating !== 0 && (
          <div className='flex items-center'>
            <Rating rating={rating} />
            <Typography variant='bodySmall' color=''>
              {value}
            </Typography>
          </div>
        )}

        {Array.isArray(value) && (
          <ul className='list-disc ml-6'>
            {value.map((val, index) => (
              <li key={index}>
                <Typography variant='bodySmall' color=''>
                  {val}
                </Typography>
              </li>
            ))}
          </ul>
        )}

        {!Array.isArray(value) && rating === 0 && (
          <Typography
            variant='bodySmall'
            color=''
            customClass='whitespace-normal break-word'
          >
            {value}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default TextRow;
