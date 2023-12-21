-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "memoryId" INTEGER,
ALTER COLUMN "updated" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "Memory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
