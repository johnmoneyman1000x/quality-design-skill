// Deliberately wrong. See README.md in this folder.
import { Card, IconButton } from "../ui";
import { FolderIcon, MoreIcon, StarIcon } from "../icons";

type Props = { name: string; owner: string; openTasks: number; doneTasks: number };

export function ProjectCard({ name, owner, openTasks, doneTasks }: Props) {
  return (
    <Card className="border border-black/5 p-4">
      <div className="flex items-center gap-2">
        <FolderIcon size={24} />
        <h3 className="text-sm font-semibold">{name}</h3>
        <IconButton icon={MoreIcon} onClick={() => console.log("menu")} />
      </div>
      <p className="text-[11px]" style={{ color: "#6b7280" }}>
        Owned by {owner}
      </p>
      <Card className="mt-[10px] border border-divider">
        <span>{openTasks} open</span>
        <span>{doneTasks} done</span>
      </Card>
      {/* design-lint allow icons-sized-by-role: empty-state illustration */}
      <StarIcon size={48} />
      <IconButton icon={StarIcon} label="Favourite project" />
    </Card>
  );
}
