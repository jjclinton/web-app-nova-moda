<?php function temp_table($country, $rows = 10) { ?>
<table class="temp-table <?php echo $country ?>" id = "temp-table <?php echo $country ?>">
    <thead>
    <tr class="tr-head">
        <th>Nr.</th>
        <?php if ($country === 'all') {?>
        <th>Country</th>
        <?php } ?>
        <th>Place</th>
        <th>Windchill</th>
    </tr>
    </thead>
    <tbody>
    <?php for ($i = 0; $i < $rows; $i++) { ?>
    <tr id = "tr <?php echo $i?>">
        <td> <?php echo $i + 1?></td>
        <td></td>
        <td></td>
        <?php if ($country === 'all') {?>
        <td></td>
        <?php } ?>
    </tr>
    <?php } ?>

        </tbody>

</table>
<?php } ?>