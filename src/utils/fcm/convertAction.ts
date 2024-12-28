import { EventDetail } from "@notifee/react-native";

const NO_ACTION = "NO_ACTION";

export const convertAction = (detail : EventDetail) : string => {
    const actionType = detail?.notification?.data?.actionType;
    let prefix = "cozymate://";
    switch(actionType){
        case "SELECT_COZY_MATE":
            return prefix.concat("main/role");
        case "COMPLETE_ALL_TODAY_TODO":
            return prefix.concat("main/role");
        case "REMINDER_ROLE" : 
            return prefix.concat("main/role");
        case "TODO_LIST" : 
            return prefix.concat("main/role");
        case "ROOM_IN" : 
            return prefix.concat("main/roomMain");
        case "ROOM_OUT" : 
            return prefix.concat("main/roomMain");
        case "ACCEPT_ROOM_INVITE" : 
            return prefix.concat("main/roomMain");
        case "ARRIVE_ROOM_INVITE" : 
            // 초대한 방의 room_id보기
            // roomId concat
            return prefix.concat("room/");
        case "ACCEPT_ROOM_JOIN" :
            return prefix.concat("main/roomMain");
        case "ARRIVE_ROOM_JOIN_REQUEST" :
            // memberId concat
            return prefix.concat("userDetail/");
        default : 
            return NO_ACTION;
    }
}