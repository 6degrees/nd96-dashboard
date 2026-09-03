/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/
interface ColumnsProps {
    onEdit?: (record: any) => void
    onDelete?: (record: any) => void
    onStatusChange?: (record: any) => void
}