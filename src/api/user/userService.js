import useAxiosPrivate from "../../hook/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function ViewUser() {
    const endpoint = '/user/view-user';
    //return GetAxiosPrivate(endpoint);
}

export function ViewUserById(id) {
    const endpoint = '/user/view-user-byId/' + id;
    //return GetAxiosPrivate(endpoint);
}

