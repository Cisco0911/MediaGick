import {login} from "@app/_lib/actions/auth";
import {parseToUserSession} from "@app/_lib/parsers";
import {setUser, setUserSession} from "@features/user/userSlice";
import {useAppDispatch} from "@app/_lib/hooks/redux-custom-hooks";

type res = {
	ok: boolean,
	msg: string
}

