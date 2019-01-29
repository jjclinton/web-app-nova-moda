<?php function temp_table($country, $rows = 10) { ?>
<table class="temp-table <?php echo $country ?>" id = "temp-table <?php echo $country ?>">
    <thead>
    <tr1>
        <th>Nr.</th>
        <th>Place</th>
        <th>Windchill</th>
    </tr1>
    </thead>
    <tbody>
    <?php for ($i = 0; $i < $rows; $i++) { ?>
    <tr id = "tr <?php echo $i?>">
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <?php } ?>

        </tbody>

</table>
<?php echo "temp-table $country";} ?>

