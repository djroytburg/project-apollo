import Image from 'next/image'
import {Inter} from 'next/font/google'
import {Button} from "@/components/ui/button";
import Link from 'next/link';
import {useRouter} from 'next/router';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {ThemeToggle} from "@/components/theme-toggle";
import {useContext} from "react";
import {UserContext} from "@/context/UserContext";
import {firebase_auth} from "@/firebase/client_side/firebase_init";
import { format, startOfWeek, endOfWeek } from 'date-fns';

const inter = Inter({subsets: ['latin']})


function SignedScreen () {
    const {user, setUser} = useContext(UserContext);
    const {userAuth, setUserAuth} = useContext(UserContext);
    const router = useRouter();
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const currentHour = currentDate.getHours(); // 0 to 23
    const isCalendarButtonVisible = currentDay == 1 || currentDay == 2 || currentDay == 3|| (currentDay == 4 && currentHour <= 12);
    const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Adjust weekStartsOn based on your locale
    const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 });
    const formattedStartDate = format(startOfWeekDate, 'MMMM d');
    const formattedEndDate = format(endOfWeekDate, 'd');

    return (<div className={"flex"}>
            {/* Left sidebar (Navigation) */}
            {user
                ?
                <div className="w-1/5 h-screen flex flex-col items-start justify-between p-4 pt-32">
                <div className={"flex flex-col gap-2"}>
                    {isCalendarButtonVisible && <Button onClick={() => router.push('/calendarpage').then()}>Calendar Page</Button>}
                    <Button onClick={() => router.push('/profile').then()}>Profile</Button>
                    <Button onClick={() => router.push('/chat').then()}>Chat</Button>
                    <Button onClick={() => router.push('/invitations').then()}>Invitations</Button>
                    <Button onClick={() => router.push('/myevents').then()}>My Events</Button>
                    <Button onClick={
                        () => {
                            firebase_auth.signOut().then((r) => {
                                setUserAuth(null);
                                setUser(null);
                            });
                        }
                    }
                    >Logout</Button>
                </div>
                </div>
                :
                <>
                    <Button onClick={() => router.push('/login').then()}>Log In</Button>
                    <Button onClick={() => router.push('/signup').then()}>Sign Up</Button>
                </>
            }
            
            {/*Main Content */}
            <div className={"flex-1 flex-col items-center justify-start pt-16 gap-9 overflow-y-auto"}>
                <h1 className="text-6xl font-bold text-center">Welcome back {user?.firstName}!</h1>
            <div className="flex gap-4 overflow-x-auto" style={{ paddingTop: '60px' }}>
                { <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>This is a sample card</CardTitle>
                        <CardDescription>See a fun weekend event here</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                        <Button>Accept</Button>
                        <Button variant="outline">Decline</Button>
                    </CardFooter>
                </Card> }
                { <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>This is a sample card</CardTitle>
                        <CardDescription>See a fun weekend event here</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                        <Button>Accept</Button>
                        <Button variant="outline">Decline</Button>
                    </CardFooter>
                </Card> }
                { <Card className="w-[350px] items-canter justify-center">
                    <CardHeader>
                        <CardTitle>No more invitations</CardTitle>
                    </CardHeader>
                </Card> }
            </div>

            <div className="Split pt-16 font-semibold">
            <h1>Upcoming Events: {formattedStartDate} - {formattedEndDate}</h1>
            </div>

            {/* Weekly Calendar */}
            <div className="App pt-8 overflow-auto">
                    <div className="flex flex-row items-center space-x-10 space-y-0">
                                                {/* First set of items */}
                                                <div className="flex flex-col items-left space-y-3">
                                                    <div className="bg-pink p-2 rounded-md" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <h1 className='text-white font-bold'>MONDAY</h1>
                                                    </div>
                                                </div>

                                                {/* Second set of items */}
                                                <div className="flex flex-col items-left space-y-3">
                                                    <div className="bg-pink p-2 rounded-md" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <h1 className='text-white font-bold'>TUESDAY</h1>
                                                    </div>
                                                </div>

                                                {/* Third set of items */}
                                                <div className="flex flex-col items-left space-y-3">
                                                    <div className="bg-pink p-2 rounded-md" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <h1 className='text-white font-bold'>WEDNESDAY</h1>
                                                    </div>
                                                </div>

                                                {/* Fourth set of items */}
                                                <div className="flex flex-col items-left space-y-3">
                                                    <div className="bg-pink p-2 rounded-md" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <h1 className='text-white font-bold'>THURSDAY</h1>
                                                    </div>
                                                </div>

                                                {/* Fifth set of items */}
                                                <div className="flex flex-col items-left space-y-3">
                                                    <div className="bg-pink p-2 rounded-md" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <h1 className='text-white font-bold'>FRIDAY</h1>
                                                    </div>
                                                </div>

                                                {/* Sixth set of items */}
                                                <div className="flex flex-col items-start space-y-3">
                                                    <div className="bg-pink p-2 rounded-md" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <h1 className='text-white font-bold'>SATURDAY</h1>
                                                    </div>
                                                </div>

                                                {/* Seventh set of items */}
                                                <div className="flex flex-col items-start space-y-3">
                                                    <div className="bg-pink p-2 rounded-md" style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <h1 className='text-white font-bold'>SUNDAY</h1>
                                                    </div>
                                                </div>
                                            </div>


                                        {/* event descriptions */}
                                            <div className="events flex flex-row space-x-10 space-y-0 pt-8">
                                                {/* First set of items */}
                                                <div className="flex flex-col items-left space-y-3">
                                                { <Card className="new"  style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <CardHeader>
                                                        <CardTitle>Sample Event</CardTitle>
                                                        <CardDescription>Event Details here.</CardDescription>
                                                    </CardHeader>
                                                </Card> }
                                                { <Card className="new"  style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <CardHeader>
                                                        <CardTitle>Sample Event</CardTitle>
                                                        <CardDescription>Event Details here.</CardDescription>
                                                    </CardHeader>
                                                </Card> }
                                                </div>

                                                {/* Second set of items */}
                                                <div className="flex flex-col items-left space-y-3">
                                                    <div className="new" style={{ width: '200px', display: 'flex', justifyContent: 'center'}}>
                                                        <h1 className='text'>No events planned.</h1>
                                                    </div>
                                                </div>

                                                {/* Third set of items */}
                                                <div className="flex flex-col items-left space-y-3">
                                                    <div className="new" style={{ width: '200px', display: 'flex', justifyContent: 'center'}}>
                                                            <h1 className='text'>No events planned.</h1>
                                                    </div>
                                                </div>

                                                {/* Fourth set of items */}
                                                <div className="flex flex-col items-left space-y-3">
                                                    { <Card className="new"  style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <CardHeader>
                                                            <CardTitle>Sample Event</CardTitle>
                                                            <CardDescription>Event Details here.</CardDescription>
                                                        </CardHeader>
                                                    </Card> }
                                                </div>

                                                {/* Fifth set of items */}
                                                <div className="flex flex-col items-left space-y-3">
                                                    <div className="new" style={{ width: '200px', display: 'flex', justifyContent: 'center'}}>
                                                            <h1 className='text'>No events planned.</h1>
                                                    </div>
                                                </div>

                                                {/* Sixth set of items */}
                                                <div className="flex flex-col items-start space-y-3">
                                                    <div className="new" style={{ width: '200px', display: 'flex', justifyContent: 'center'}}>
                                                            <h1 className='text'>No events planned.</h1>
                                                    </div>
                                                </div>

                                                {/* Seventh set of items */}
                                                <div className="flex flex-col items-start space-y-3">
                                                    <div className="new" style={{ width: '200px', display: 'flex', justifyContent: 'center'}}>
                                                            <h1 className='text'>No events planned.</h1>
                                                    </div>
                                                </div>

                                            </div>
                </div>
            </div>

            {/* Right sidebar (Events Coming Up) */}
            <div className="w-1/5 h-screen flex flex-col items-end justify-between p-4 pt-32 pr-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold" style={{ paddingTop: '20px' }}>New Messages</h1>
                    <Button onClick={() => router.push('/chat').then()}>Chat</Button>
                    
                </div>
            </div>
    </div>)
}

function NotSignedScreen () {
    const router = useRouter();
    return (<div className="mx-auto text-center justify-center h-screen items-center ">
    <h1 className="text-6xl font-bold text-center mt-4 mb-4">Welcome to Mutuals!</h1>
    
    <div className="w-full p-3 pt-0 sm:p-0 sm:w-2/4 pl-6 sm:pl-0 text-center mx-auto mt-4 mb-4">
        <h2 className="text-sm sm:text-xl text-muted-foreground font-normal text-left sm:text-center">
            Kindred Interests, Memorable Meets: Connecting You to Your Ideal Events.
        </h2>
    </div>
   
    <div>
        <Button className = "mr-8" onClick={() => router.push('/login').then()}>Log In</Button>
        <Button onClick={() => router.push('/signup').then()}>Sign Up</Button>
    </div>
    </div>)
}

export default function Home() {
    const {user, setUser} = useContext(UserContext);
    const {userAuth, setUserAuth} = useContext(UserContext);
    const router = useRouter();
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const currentHour = currentDate.getHours(); // 0 to 23
    const isCalendarButtonVisible = currentDay == 1 || currentDay == 2 || currentDay == 3|| (currentDay == 4 && currentHour <= 12);
    const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Adjust weekStartsOn based on your locale
    const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 });
    const formattedStartDate = format(startOfWeekDate, 'MMMM d');
    const formattedEndDate = format(endOfWeekDate, 'd');

    return (
        <>
            {user? SignedScreen(): NotSignedScreen()}
        </> 
    )

}

