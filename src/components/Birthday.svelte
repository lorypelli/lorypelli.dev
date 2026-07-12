<script lang="ts">
    import { DateTime } from 'luxon';
    import { SvelteDate } from 'svelte/reactivity';
    import { UnitName } from '../../types';
    const currentYear = $state(new Date().getFullYear());
    const currentMonth = $state(new Date().getMonth() + 1);
    const currentDay = $state(new Date().getDay());
    const year = $state(() => {
        if (
            currentMonth > birthMonth ||
            (currentMonth == birthMonth && currentDay > birthDay)
        ) {
            return currentYear + 1;
        }
        return currentYear;
    });
    const birthMonth = 5;
    const birthDay = 3;
    const difference = $state(() =>
        nextBirthday.diffNow([
            'years',
            'months',
            'days',
            'hours',
            'minutes',
            'seconds',
        ]),
    );
    let nextBirthday = $derived(
        DateTime.fromJSDate(new SvelteDate(year(), birthMonth - 1, birthDay)),
    );
    let diff = $derived(difference());
    $effect(() => {
        const interval = setInterval(() => {
            diff = difference();
        }, 1000);
        return () => clearInterval(interval);
    });
</script>

{#snippet birthday(unit: number, name: UnitName)}
    <div class="flex flex-col items-center">
        <span>{Math.round(unit)}</span>
        <span>{name}</span>
    </div>
{/snippet}

<span>My birthday will be in:</span>
<div class="flex gap-x-2">
    {@render birthday(diff.years, UnitName.YEARS)}
    {@render birthday(diff.months, UnitName.MONTHS)}
    {@render birthday(diff.days, UnitName.DAYS)}
    {@render birthday(diff.hours, UnitName.HOURS)}
    {@render birthday(diff.minutes, UnitName.MINUTES)}
    {@render birthday(diff.seconds, UnitName.SECONDS)}
</div>
