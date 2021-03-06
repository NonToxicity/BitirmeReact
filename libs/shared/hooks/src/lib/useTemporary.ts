import { useSelector } from 'react-redux';

export function useTemporary() {
  const isErrorRequired = useSelector((store) => store.temp?.errorRequired);
  const isSuccessRequired = useSelector((store) => store.temp?.successRequired);
  return {
        isErrorRequired,
    isSuccessRequired,
  };
}
