import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@heroui/react";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";

export default function LikeDropdown() {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    className="text-tiny text-white bg-black/20"
                    color="default"
                    radius="lg"
                    size="md"
                    variant="flat"
                    startContent={<FcBusinessman size={25}/>}
                >Reaction</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
                <DropdownItem
                    key="new"
                    shortcut="⌘N"
                    startContent={<FcLike className={iconClasses} />}
                >
                    Like
                </DropdownItem>
                <DropdownItem
                    key="copy"
                    shortcut="⌘C"
                    startContent={<FcDislike className={iconClasses} />}
                >
                    Dislike
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
