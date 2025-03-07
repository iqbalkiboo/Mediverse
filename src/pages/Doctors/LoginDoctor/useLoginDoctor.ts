import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { resolveListClinicByDoctor } from '@/src/store/userDoctor/userDoctor.reducer';
import {
  mapHealthFacilityOption,
  mapPlacements,
} from '@/src/mappers/userDoctors';
import cookieUtils from '@/src/utils/cookieUtils';

const userDetails = cookieUtils.getUser();

const useLoginDoctor = () => {
  const dispatch = useDispatch();

  const { placement } = useSelector(
    (state: RootStateOrAny) => state.userDoctor
  );

  const handleGetClinicByDoctor = () => {
    dispatch(
      resolveListClinicByDoctor({
        id: userDetails?.doctor_id,
        channelId: userDetails?.provider_id,
      })
    );
  };

  const healthFacilities = mapPlacements(placement.data);
  const healthFacilityOption = mapHealthFacilityOption(placement.data);

  return {
    data: {
      placement,
      healthFacilities,
      healthFacilityOption,
    },
    method: {
      handleGetClinicByDoctor,
    },
  };
};

export default useLoginDoctor;
