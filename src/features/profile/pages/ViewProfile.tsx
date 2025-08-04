import { useSelector } from "react-redux";

const ViewProfile = () => {
    const profile = useSelector((state: any) => state.profile);
    console.log("ViewProfile", profile);
    return (
        <div>
            <h1>Profile Details </h1>
            <div>
                <h2>Basic Information</h2>
                <p><strong>Full Name:</strong> {profile.basicInfo.fullName}</p>
                <p><strong>Email:</strong> {profile.basicInfo.email}</p>
                <p><strong>Phone:</strong> {profile.basicInfo.phone}</p>
            </div>
            <div>
                <h1>Work Experience</h1>
                <p><strong>Is Fresher:</strong> {profile.workExperience.isFresher ? "Yes" : "No"}</p>
                {!profile.workExperience.isFresher && (
                    <>
                        <p><strong>Total Experience:</strong> {profile.workExperience.totalExpYear} years {profile.workExperience.totalExpMonth} months</p>
                        <p><strong>Company:</strong> {profile.workExperience.company}</p>
                        <p><strong>Title:</strong> {profile.workExperience.title}</p>
                        <p><strong>Joining Date:</strong> {profile.workExperience.joiningYear} - {profile.workExperience.joiningMonth}</p>
                        <p><strong>Notice Period:</strong> {profile.workExperience.notice}</p>
                        <p><strong>Profile:</strong> {profile.workExperience.profile}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default ViewProfile;