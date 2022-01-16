import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../services/reducers/index';

// custom ts-oriented useSelector & useDispatch hooks
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppThunk<void> = () => dispatchHook<AppDispatch | AppThunk>(); 