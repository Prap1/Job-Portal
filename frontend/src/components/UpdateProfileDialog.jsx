import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "./utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";


const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    location:user?.profile?.location,
    file: user?.profile?.resume,

  });
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    formData.append("location", input.location);
    if (input.file) {
        formData.append("file", input.file);
    }
    try {
        setLoading(true);
        const res = await axios.post(`${USER_API_END_POINT}/update-profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        if (res.data.success) {
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
        }
    } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message);
    } finally{
        setLoading(false);
    }
    setOpen(false);
    console.log(input);
}
  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogTitle>Update Profile</DialogTitle>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 ">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <label htmlFor="email" className="text-right">
                email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <label htmlFor="number" className="text-right">
                Number
              </label>
              <Input
                id="number"
                value={input.phoneNumber}
                name="number"
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <label htmlFor="bio" className="text-right">
                bio
              </label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <label htmlFor="skills" className="text-right">
                skills
              </label>
              <Input
                id="skills"
                value={input.skills}
                name="skills"
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <label htmlFor="skills" className="text-right">
              Location
              </label>
              <Input
                id="location"
                value={input.location}
                name="location"
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div>
              <label htmlFor="file" className="text-right">
                Resume
              </label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
