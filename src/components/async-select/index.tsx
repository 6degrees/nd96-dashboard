import AsyncSelectBase from 'react-select/async'
import { AsyncPaginate } from 'react-select-async-paginate'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { theme } from 'antd'
import {
    useCallback,
    useMemo,
    useEffect,
    useState,
    useRef,
} from 'react'

/*
|--------------------------------------------------------------------------
| Async Select Props
|--------------------------------------------------------------------------
|
| Defines the component props used to control the async select behavior.
| Supports paginated APIs and enum-based APIs.
|
*/

interface Props {
    value?: any
    onChange?: (value: any) => void
    placeholder?: string
    action: any
    filters?: any
    labelKey?: string
    valueKey?: string
    isPaginated?: boolean
    isMulti?: boolean
}

/*
|--------------------------------------------------------------------------
| Async Select Component
|--------------------------------------------------------------------------
|
| Reusable async select component built on top of react-select.
| Supports:
|
| - API search
| - Infinite scroll pagination
| - Enum/static responses
| - Custom label and value keys
| - Multi select
| - Translation support
|
*/

export const AsyncSelect = ({ value, onChange, placeholder, action, filters={}, labelKey = 'title', valueKey = 'id', isPaginated = true, isMulti = false, }: Props) => {
    /*
    |--------------------------------------------------------------------------
    | Redux Dispatch
    |--------------------------------------------------------------------------
    |
    | Used to trigger async Redux actions for fetching select options.
    |
    */

    const dispatch = useDispatch()

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    | Handles translations and current language detection.
    |
    */

    const { t } = useTranslation()
    const { token } = theme.useToken()

    /*
    |--------------------------------------------------------------------------
    | Select Styles
    |--------------------------------------------------------------------------
    |
    */
    const selectStyles = {
        control: (base: any, state: any) => ({
            ...base,
            minHeight: '40px',
            borderRadius: token.borderRadiusLG + 'px',
            borderColor: state.isFocused ? token.colorPrimary : token.colorBorder,
            boxShadow: state.isFocused ? `0 0 0 2px ${token.colorPrimary}20` : 'none',
            backgroundColor: token.colorBgContainer,
            paddingLeft: '0.25rem',
            paddingRight: '0.25rem',
            transition: 'all 0.2s ease-in-out',
            '&:hover': { borderColor: token.colorPrimary, },
            fontFamily: 'Alexandria, sans-serif',
        }),
        menu: (base: any) => ({
            ...base,
            borderRadius: token.borderRadiusLG + 'px',
            boxShadow: token.boxShadowSecondary,
            border: `1px solid ${token.colorBorderSecondary}`,
            overflow: 'hidden',
            marginTop: '0.5rem',
            backgroundColor: token.colorBgContainer,
            zIndex: 9999,
            fontFamily: 'Alexandria, sans-serif',
        }),
        menuList: (base: any) => ({
            ...base,
            padding: '0.25rem',
            maxHeight: '220px',
        }),
        option: (base: any, state: any) => ({
            ...base,
            borderRadius: token.borderRadiusSM + 'px',
            padding: '0.5rem 0.75rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            fontFamily: 'Alexandria, sans-serif',
            backgroundColor: state.isSelected
                ? token.colorPrimary
                : state.isFocused
                    ? token.colorPrimaryBg
                    : 'transparent',
            color: state.isSelected
                ? token.colorTextLightSolid
                : state.isFocused
                    ? token.colorPrimary
                    : token.colorText,
            '&:active': {
                backgroundColor: token.colorPrimary,
                color: token.colorTextLightSolid,
            },
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: token.colorFillSecondary,
            borderRadius: token.borderRadiusSM + 'px',
            alignItems: 'center',
            paddingLeft: '0.25rem',
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: token.colorText,
            fontSize: '0.8125rem',
            fontWeight: '500',
            padding: '0.125rem 0.375rem',
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            color: token.colorTextDescription,
            borderRadius: token.borderRadiusSM + 'px',
            paddingLeft: '0.125rem',
            paddingRight: '0.125rem',
            marginLeft: '0.125rem',
            marginRight: '0.125rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            '&:hover': {
                backgroundColor: token.colorErrorBg,
                color: token.colorError,
            },
        }),
        placeholder: (base: any) => ({
            ...base,
            color: token.colorTextPlaceholder,
            fontSize: '0.875rem',
            fontFamily: 'Alexandria, sans-serif',
        }),
        singleValue: (base: any) => ({
            ...base,
            color: token.colorText,
            fontSize: '0.875rem',
        }),
        menuPortal: (base: any) => ({
            ...base,
            zIndex: 99999,
        }),
        input: (base: any) => ({
            ...base,
            fontSize: '0.875rem',
            color: token.colorText,
        }),
    }

    /*
    |--------------------------------------------------------------------------
    | Options State
    |--------------------------------------------------------------------------
    |
    | Stores select options locally for matching and mapping.
    |
    */

    const [staticOptions, setStaticOptions] = useState<any[]>([])
    const [dynamicOptionsMap, setDynamicOptionsMap] = useState<Record<string, any>>({})
    const fetchedIdsRef = useRef<Set<string>>(new Set())

    /*
    |--------------------------------------------------------------------------
    | Fetch Static Options
    |--------------------------------------------------------------------------
    |
    | Fetches static/enum options once on component mount.
    |
    */

    useEffect(() => {
        if (isPaginated) return

        const fetchStaticOptions = async () => {
            const response = await dispatch(action(filters))

            /*
            |--------------------------------------------------------------------------
            | ENUM Object Response
            |--------------------------------------------------------------------------
            */

            if (!Array.isArray(response)) {
                const options = Object.entries(response).map(([value, label]) => ({ label, value, }))
                setStaticOptions(options)
                return
            }

            /*
            |--------------------------------------------------------------------------
            | Static Array Response
            |--------------------------------------------------------------------------
            */

            const options = response.map(
                (item: any) => ({
                    label: item[labelKey],
                    value: item[valueKey],
                    data: item,
                })
            )

            setStaticOptions(options)
        }

        void fetchStaticOptions()
    }, [dispatch, action, isPaginated, labelKey, valueKey,])

    /*
    |--------------------------------------------------------------------------
    | Initial Values Auto-Correction (Sanitization)
    |--------------------------------------------------------------------------
    |
    | This hook automatically intercept raw backend objects (e.g., {id, title})
    | passed as initial values and flattens them into pure IDs/UUIDs.
    |
    */
    useEffect(() => {
        if (!value || !onChange) return;

        if (isMulti) {
            if (Array.isArray(value)) {
                const hasObjects = value.some(val => typeof val === 'object' && val !== null);
                if (hasObjects) {
                    const pureValues = value.map(val =>
                        typeof val === 'object' && val !== null ? (val[valueKey] || val.value || val.id) : val
                    );
                    onChange(pureValues);
                }
            }
        }
    }, [value, isMulti, onChange, valueKey]);

    /*
    |--------------------------------------------------------------------------
    | Missing Initial Values Fetcher
    |--------------------------------------------------------------------------
    |
    | Automatically catches pure IDs passed from form initial values,
    | fetches their corresponding objects from API, and populates the map.
    |
    */
    useEffect(() => {
        if (!isPaginated || !value) return

        const idsToFetch: string[] = []
        const currentValues = Array.isArray(value) ? value : [value]

        currentValues.forEach((val) => {
            // Check if it's a primitive ID or an object with missing label/title
            if (typeof val !== 'object' || (val !== null && !val.label && !val[labelKey])) {
                const targetId = typeof val === 'object' ? String(val.value || val[valueKey]) : String(val)
                if (!dynamicOptionsMap[targetId] && !fetchedIdsRef.current.has(targetId)) {
                    idsToFetch.push(targetId)
                    fetchedIdsRef.current.add(targetId)
                }
            }
        })

        if (idsToFetch.length === 0) return

        const fetchMissingDetails = async () => {
            for (const id of idsToFetch) {
                try {
                    const response = await dispatch(action({ search: id, start: 0, ...filters }))
                    if (response && Array.isArray(response.data)) {
                        const match = response.data.find((item: any) => String(item[valueKey]) === id)
                        if (match) {
                            setDynamicOptionsMap((prev) => ({
                                ...prev,
                                [id]: {
                                    label: match[labelKey],
                                    value: match[valueKey],
                                    data: match,
                                },
                            }))
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch initial option details:', error)
                }
            }
        }

        void fetchMissingDetails()
    }, [value, isPaginated, dispatch, action, labelKey, valueKey, dynamicOptionsMap])

    /*
    |--------------------------------------------------------------------------
    | Dynamic Value Matcher
    |--------------------------------------------------------------------------
    */
    const getSelectedValue = () => {
        if (!value) return isMulti ? [] : null

        const parseSingleValue = (val: any) => {
            if (typeof val === 'object' && val !== null) {
                // If it's already structured for react-select, return it
                if (val.label && val.value) return val;
                // If it came from our Custom API Mixin (e.g., region_detail)
                return {
                    value: val[valueKey] || val.value || val.id,
                    label: val[labelKey] || val.label || val.name || val.title
                }
            }

            const stringId = String(val)
            if (!isPaginated) {
                const found = staticOptions.find((opt) => String(opt.value) === stringId)
                if (found) return found
            } else {
                if (dynamicOptionsMap[stringId]) return dynamicOptionsMap[stringId]
            }

            return { value: val, label: t('loading') || 'Loading...' }
        }

        if (isMulti && Array.isArray(value)) {
            return value.map(parseSingleValue)
        }

        return parseSingleValue(value)
    }

    /*
    |--------------------------------------------------------------------------
    | Dynamic Output Filter
    |--------------------------------------------------------------------------
    */
    const handleValueChange = (selected: any) => {
        if (!onChange) return

        if (isMulti) {
            // ALWAYS extract only the pure values/IDs before bubble-up
            const pureValues = selected ? selected.map((item: any) => item.value) : []
            onChange(pureValues)
        } else {
            // ALWAYS extract only the pure value/ID before bubble-up
            const pureValue = selected ? selected.value : null
            onChange(pureValue)
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Static Search
    |--------------------------------------------------------------------------
    |
    | Filters static options locally without refetching.
    |
    */

    const loadStaticOptions = useCallback(
        async (search: string) => {
            return staticOptions.filter((item) => String(item.label).toLowerCase().includes(search.toLowerCase()))
        },
        [staticOptions]
    )

    /*
    |--------------------------------------------------------------------------
    | Paginated APIs
    |--------------------------------------------------------------------------
    |
    | Handles paginated responses:
    |
    | {
    |   page: 1,
    |   recordsFiltered: 100,
    |   data: []
    | }
    |
    */
    const loadPaginatedOptions = useCallback(
        async (search: string, loadedOptions: any, { page }: any) => {
            const start = (page - 1) * 10
            const response = await dispatch(action({ search, start, ...filters}))

            const formattedOptions = response.data.map((item: any) => ({
                label: item[labelKey],
                value: item[valueKey],
                data: item,
            }))

            setDynamicOptionsMap((prev) => {
                const nextMap = { ...prev }
                formattedOptions.forEach((opt: any) => {
                    nextMap[String(opt.value)] = opt
                })
                return nextMap
            })

            return {
                options: formattedOptions,
                hasMore: response.next_url != null,
                additional: { page: page + 1, },
            }
        },
        [dispatch, action, labelKey, valueKey]
    )

    /*
    |--------------------------------------------------------------------------
    | Initial Additional Data
    |--------------------------------------------------------------------------
    |
    | Memoized pagination state to prevent unnecessary rerenders.
    |
    */

    const additional = useMemo(() => {
        return {
            page: 1,
        }
    }, [])

    /*
    |--------------------------------------------------------------------------
    | Static Async Select
    |--------------------------------------------------------------------------
    */

    if (!isPaginated) {
        return (
            <AsyncSelectBase
                classNamePrefix="react-select"
                cacheOptions
                defaultOptions={staticOptions}
                value={getSelectedValue()}
                onChange={handleValueChange}
                placeholder={placeholder || t('search')}
                loadOptions={loadStaticOptions}
                isMulti={isMulti}
                styles={selectStyles}
                isClearable
                menuPosition="fixed"
                menuPortalTarget={
                    typeof document !== 'undefined'
                        ? document.body
                        : undefined
                }
                menuPlacement="auto"
            />
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Paginated Async Select
    |--------------------------------------------------------------------------
    */

    return (
        <AsyncPaginate
            classNamePrefix="react-select"
            value={getSelectedValue()}
            onChange={handleValueChange}
            placeholder={placeholder || t('search')}
            loadOptions={loadPaginatedOptions}
            isMulti={isMulti}
            debounceTimeout={300}
            additional={additional}
            styles={selectStyles}
            isClearable
            menuPosition="fixed"
            menuPortalTarget={
                typeof document !== 'undefined'
                    ? document.body
                    : undefined
            }
            menuPlacement="auto"
        />
    )
}