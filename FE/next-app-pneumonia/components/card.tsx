"use client";

import {Card, CardFooter, Image, Button} from "@heroui/react";
import LikeDropdown from "./dropdown";

export default function PredictCard() {

    return (
        <Card isFooterBlurred className="border-none" radius="lg">
            <Image
                alt="Woman listing to music"
                className="object-cover"    
                src="https://www.e7health.com/files/blogs/chest-x-ray-29.jpg"
                style={{ width: "500px", height: "500px" }}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-medium text-white/80">Your prediction</p>
                {/* <Button
                    className="text-tiny text-white bg-black/20"
                    color="default"
                    radius="lg"
                    size="sm"
                    variant="flat"
                >
                    Notify me
                </Button> */}
                <LikeDropdown/>
            </CardFooter>
        </Card>
    );
};
