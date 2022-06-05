// SERVICES
export { AuthService } from './_services';
export { AuthNoticeService } from './auth-notice/auth-notice.service';


// ACTIONS
export {
    Login,
    Logout,
    Register,
    UserRequested,
    UserLoaded,
    AuthActionTypes,
    AuthActions
} from './_actions/auth.actions';


// EFFECTS
export { AuthEffects } from './_effects/auth.effects';

// REDUCERS
export { authReducer } from './_reducers/auth.reducers';





// GUARDS
export { AuthGuard } from './_guards/auth.guard';


// MODELS
export { User } from './_models/user.model';
export { Address } from './_models/address.model';
export { SocialNetworks } from './_models/social-networks.model';
export { AuthNotice } from './auth-notice/auth-notice.interface';


